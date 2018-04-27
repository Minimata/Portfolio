import { Meteor } from 'meteor/meteor';

import '../imports/api/Articles.js';

Meteor.startup(() => {
    /**
     *
     * WebAppInternals.setBundledJsCssUrlRewriteHook((url) => {
          return `https://d3rg8n3psnhobf.cloudfront.net${url}&_g_app_v_=${process.env.GALAXY_APP_VERSION_ID}`;
        });
     *
     */

    if(Meteor.isProduction) {
        console.log(Meteor.settings.public.cdnURL);
        WebAppInternals.setBundledJsCssPrefix("https://d3rg8n3psnhobf.cloudfront.net");
    }
});
