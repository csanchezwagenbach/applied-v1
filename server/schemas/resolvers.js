const { AuthenticationError } = require('apollo-server-express');
const { User, Application } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('applications');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        applications: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Application.find(params).sort({ date_applied: -1 });
        },
        application: async (parent, { applicationId }) => {
            return Application.findOne({ _id: applicationId });
        }  
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          addApplication: async (parent, { job_title, company_name, lead_source, description, date_applied }, context) => {
            if (context.user) {
                const application = await Application.create({
                    job_title,
                    company_name,
                    lead_source,
                    description,
                    date_applied
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { applications: application._id }}
                );

                return application;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteApplication: async (parent, { applicationId }, context) => {
            if (context.user) {
                const application = await Application.findOneAndDelete({
                    _id: applicationId
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { applications: application._id } }
                );

                return application;
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    }
};

module.exports = resolvers;