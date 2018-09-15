# app-dev-testing-permissions
App to test the standard permission on the REST API

## Tests to prepare

1. A content-type without permissions. Access to the API for this type (read, write, delete) should result in the following effects
    1. host-user: everything works
    1. admin-user: everything works
    1. edit-user: nothing works
    1. registered user: nothing works
    1. Anonymou user: nothing works
1. a content-type with read permissions for a certain group of users. Test it
    1. with a user in this group, it should work
    1. with a user in another group, this should fail
    1. with anonymous users this should fail
    
## Owner tests
1. a content-type with create permissions for a certain group of users. Test it
    1. with users in this group, 
        1. create should work
        1. read should fail (because only create is given)
    1. with other users, create and read should fail
    1. with anonymous users, create and read should fail
1. Another content-type with "registered" create permissions, and owner edit / delete permissions, test
    1. registered users should be able to create
    1. anonymous should not
    1. only the owner of an item should be able to edit it
    1. other registered users should not
    1. anonymous not
    1. only the owner should be able to delete it
    1. other regitsered users not
    1. anonymous not
    
## Anonymous Tests
1. a content-type with create permissions for anonymous
    1. everybody should be able to create
    1. reading shouldn't be possible (except for host/admin)
1. a content-type with create-draft permissions for anonymous
    1. everybody should be able to create - but it should always be draft
1. a content-type with read permissions for anonymous
    1. everybody should be able to read

## Owner tests
