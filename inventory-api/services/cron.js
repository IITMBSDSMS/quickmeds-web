const cron = require('node-cron');
const Profile = require('../models/Profile');
const Subscription = require('../models/Subscription');
const { getIo } = require('./socket');

const initCronJobs = () => {
  // This cron job checks periodically if any active reminders need triggering.
  console.log("⏰ Medication Cron Service Initialized");

  cron.schedule('* * * * *', async () => {
    try {
      const nowHours = new Date().getHours();
      const nowMinutes = new Date().getMinutes();

      const profiles = await Profile.find({ "reminders.active": true });

      profiles.forEach(profile => {
        profile.reminders.forEach(reminder => {
          if (reminder.active && reminder.cronSchedule) {
            // Standard cron logic checks
            const [min, hr] = reminder.cronSchedule.split(' ');
            
            const matchMin = min === '*' || parseInt(min) === nowMinutes;
            const matchHr = hr === '*' || parseInt(hr) === nowHours;

            if (matchMin && matchHr) {
               console.log(`🔔 TICK: Reminder for User ${profile.userId} to take ${reminder.medicineName}`);
               // Emit real-time warning if socket exists
               try {
                 getIo().emit(`reminder_${profile.userId}`, { 
                   message: `It is time to take your ${reminder.medicineName}` 
                 });
               } catch(e) {}
            }
          }
        });
      });
    } catch(e) {
      console.error("Cron Error", e);
    }
  });

  // Daily Refill Subscription Sweep (Triggers Midnight exactly)
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log("🔄 Running Daily Subscription Reminders");
      const today = new Date();
      // Target refills due strictly in 3 Days (72 Hrs notice prior to bill)
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + 3);

      const startOfDay = new Date(targetDate.setHours(0,0,0,0));
      const endOfDay = new Date(targetDate.setHours(23,59,59,999));

      const upcomingRefills = await Subscription.find({
        isActive: true,
        nextRefillDate: { $gte: startOfDay, $lte: endOfDay }
      });

      upcomingRefills.forEach(sub => {
         // This is where Twilio/Resend webhooks would fire
         console.log(`✉️ Simulated Email/Push sent to User ${sub.userId} for upcoming ${sub.planType} refill.`);
      });

    } catch (e) {
      console.error("Subscription Cron Error", e);
    }
  });
};

module.exports = { initCronJobs };
