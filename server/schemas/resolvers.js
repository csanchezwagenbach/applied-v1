const { AuthenticationError } = require('apollo-server-express');
const { User, Application } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const dog = await User.findOne({ _id: context.user._id }).populate('applications');
              return dog
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        applications: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Application.find(params).sort({ date_applied: -1 });
        },
        application: async (parent, { applicationId }) => {
          console.log(applicationId, "LOOK HERE ID")
            const appData = await Application.findOne({ _id: applicationId });
            console.log(appData);
            return appData
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
          addApplication: async (parent, { job_title, resume, cover_letter, company_name, lead_source, description, date_applied }, context) => {
            console.log(context.user)
            if (context.user) {
                const application = await Application.create({
                    job_title,
                    company_name,
                    lead_source,
                    description,
                    date_applied,
                    resume,
                    cover_letter
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { applications: application._id }}
                );

                return application;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          updateApplication: async (parent,  args , context) => {
            if (context.user) {
              const application = await Application.findOneAndUpdate(
                {_id: args.applicationId},
                { $set: args}
              );
              console.log(application)
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