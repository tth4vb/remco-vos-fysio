import { defineField, defineType } from "sanity";

export default defineType({
  name: "dayHours",
  title: "Day Hours",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      options: {
        list: [
          { title: "Maandag", value: "Maandag" },
          { title: "Dinsdag", value: "Dinsdag" },
          { title: "Woensdag", value: "Woensdag" },
          { title: "Donderdag", value: "Donderdag" },
          { title: "Vrijdag", value: "Vrijdag" },
          { title: "Zaterdag", value: "Zaterdag" },
          { title: "Zondag", value: "Zondag" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "open",
      title: "Open",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "openTime",
      title: "Opening Time",
      type: "string",
      description: "e.g., 09:00",
      hidden: ({ parent }) => !parent?.open || parent?.byAppointment,
    }),
    defineField({
      name: "closeTime",
      title: "Closing Time",
      type: "string",
      description: "e.g., 17:00",
      hidden: ({ parent }) => !parent?.open || parent?.byAppointment,
    }),
    defineField({
      name: "openTime2",
      title: "Second Opening Time (optional)",
      type: "string",
      description: "For split hours, e.g., 14:00",
      hidden: ({ parent }) => !parent?.open || parent?.byAppointment,
    }),
    defineField({
      name: "closeTime2",
      title: "Second Closing Time (optional)",
      type: "string",
      description: "For split hours, e.g., 18:00",
      hidden: ({ parent }) => !parent?.open || parent?.byAppointment,
    }),
    defineField({
      name: "byAppointment",
      title: "By Appointment Only",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.open,
    }),
  ],
  preview: {
    select: {
      day: "day",
      open: "open",
      openTime: "openTime",
      closeTime: "closeTime",
      byAppointment: "byAppointment",
    },
    prepare({ day, open, openTime, closeTime, byAppointment }) {
      let subtitle = "Gesloten";
      if (open) {
        if (byAppointment) {
          subtitle = "Op afspraak";
        } else if (openTime && closeTime) {
          subtitle = `${openTime} - ${closeTime}`;
        }
      }
      return {
        title: day,
        subtitle,
      };
    },
  },
});
