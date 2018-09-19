# app-dev-testing-permissions-REST
App to test the standard permission on the REST API

## Permission Setup

Create these groups and users to start:

1. In the existing admin-group, create a user called
    1. Papa Smurf
1. Group **Smurfs** with Members
    1. Brainy Smurf
    1. Greede Smurf
    1. Smurfette
    1. AppSmurf (this one will be for app-permission checks)
1. Group **Bad Guys** with members
    1. Gargamel
    1. Azrael
1. In the group of registered users, just put in some non-smurfs:
    1. Lone Ranger
    1. Spiderman
    1. Hulk

## Tests to prepare for Content-Types (t1x...)

1. A content-type without permissions. Access to the API for this type (read, write, delete) should result in the following effects
    1. host-user: everything works
    1. Accounting (admin-user): everything works
    1. Smurfette (user with some page-edit permissions): nothing works
    1. Spiderman (registered user): nothing works
    1. Anonymous user: nothing works
1. a content-type with read permissions for a **Smurfs** . Test it
    1. with a user in this group, it should work
    1. with a user in another group, this should fail
    1. with anonymous users this should fail
    
    
## Tests to prepare for App (NEW) (t2x...)

1. On the full app, give the user AppSmurf read permissions the APP
    1. test that this one can read all content types
    1. other smurfs can only read some
    
## Owner tests (t3x...)
1. a content-type with create permissions for **Smurfs**. Test it
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
    1. other registered users not
    1. anonymous not
    
## Anonymous Tests (t4x...)
1. a content-type with create permissions for anonymous
    1. everybody should be able to create
    1. reading shouldn't be possible (except for host/admin)
1. a content-type with create-draft permissions for anonymous
    1. everybody should be able to create - but it should always be draft
1. a content-type with read permissions for anonymous
    1. everybody should be able to read

## Query Tests (t5x...)
1. Create a query without permissions - anon and registered should not be able to query
1. create a query with a group-permissions, that should be able to read, anon not
1. create a public query (anon-read), that should work
