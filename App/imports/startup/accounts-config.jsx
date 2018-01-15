/**
 * Created by alexandre on 13.01.2017
 */

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});