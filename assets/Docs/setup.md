# How to setup environment for testing permissions with this app?

1. Install DNN 7.4.2 (http://2sxc-dnn742-test.dnndev.me)
1. Install 2sxc
1. Install this app in 2sxc
1. Copy DNN page templates from eg. \Portals\0\2sxc\app-dev-testing-permissions-REST\assets\Templates to eg. \Portals\0\Templates (use real path depending on your Portal setup)
1. Create new page "app-dev-testing-permissions-rest" using page template **app-dev-testing-permissions-REST.page.template**
1. Enable Page Permission  "All Users" to "View Page"
1. Click on "install users and roles" link to the top of the new page
![install-users-and-roles](images/install-users-and-roles.png)

1. Remember groupId for group "Smurfs" (see on screenshot above).
1. In 2sxc app config, update groupId for permissions on content types
   1. t12-content-type-R (content-type with read permissions for a Smurfs)
   1. t31-content-type-C (content-type with create permissions for Smurfs)
![read-permissions-for-smurfs](images/read-permissions-for-smurfs.png)

1. Convert dnn user SuperUser to SuperUser account.
1. Click on [Sign in AppSmurf...], than copy **UserGuid**, than again Sign in as SuperUser
![sign-in-appsmurf](images/sign-in-appsmurf.png)

1. Setup 2sxc app permissions, that AppSmurf have read rights on the App
![user-appsmurf-read-permissions-for-the-app](images/user-appsmurf-read-permissions-for-the-app.png)

All is ready for testing.
