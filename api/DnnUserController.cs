using System;
using System.Linq;
using System.Web.Http;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Users;
using DotNetNuke.Security;
using DotNetNuke.Security.Membership;
using DotNetNuke.Security.Roles;
using DotNetNuke.Web.Api;
using ToSic.SexyContent.WebApi;

public class DnnUserController : SxcApiController
{
    private RoleProvider _roleProvider = RoleProvider.Instance();

    [HttpGet]
    [AllowAnonymous]
    public bool Login(string username, string password)
    {
        var status = UserLoginStatus.LOGIN_FAILURE;
        var portalId = Dnn.Portal.PortalId;
        var portalName = string.Empty;
        var ipAddress = string.Empty; // Request.GetIPAddress() ?? "";
        var authType = "DNN";
        var verificationCode = string.Empty; //"Bearer";

        try
        {
            var userInfo = UserController.ValidateUser(portalId, username, password, authType, portalName, verificationCode, ipAddress, ref status);

            // user is not valid
            if (userInfo == null) return false;

            // dnn login
            UserController.UserLogin(portalId, userInfo, portalName, ipAddress, true);
            return true;
        }
        catch
        {
            return false;
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public bool Logout()
    {
        try
        {
            var portalSecurity = new PortalSecurity();
            portalSecurity.SignOut();
            return true;
        }
        catch
        {
            return false;
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public string Register(string username, string password)
    {
        try
        {
            // 1. Check Password is Valid
            if (!UserController.ValidatePassword(password)) return null;

            var user = new UserInfo
            {
                PortalID = Dnn.Portal.PortalId,
                Username = username,
                Email = username + "@lab4dev.ml",
                DisplayName = username,
                Membership = { Password = password, Approved = true }
            };

            var CreateStatus = UserController.CreateUser(ref user);

            return user.Username;
        }
        catch (Exception e)
        {
            return e.Message;
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public string CreateGroup(string name)
    {
        // empty name is invalid
        if (string.IsNullOrEmpty(name))
        {
            return null;
        }

        name = name.Trim();

        RoleInfo role = _GetDnnRole(name);
        if (role == null)
        {
            // create new group
            role = _GetNewDnnRole(name);
            _roleProvider.CreateRole(role);
        }

        return string.Format("{0}, {1}", role.RoleID, name);
    }

    [HttpGet]
    [AllowAnonymous]
    public string AddGroupMember(string groupname, string username)
    {
        // empty groupname or username
        if (string.IsNullOrEmpty(groupname) || string.IsNullOrEmpty(username))
        {
            return "error: empty groupname or username";
        }

        groupname = groupname.Trim();
        username = username.Trim();

        // get user by username
        UserInfo user = _GetUserByUserName(username);
        if (user == null)
        {
            // user do not exists
            return "error: user do not exists";
        }

        // get group by group name
        RoleInfo group = _GetDnnRole(groupname);
        if (group == null)
        {
            // group do not exists
            return "error: group do not exists";;
        }

        // add user to group 
        RoleController RoleController = new RoleController();
        RoleController.AddUserRole(Dnn.Portal.PortalId, user.UserID, group.RoleID, Null.NullDate, Null.NullDate);

        return "user " + username + " is in group "+ groupname;
    }

    private RoleInfo _GetDnnRole(string roleName)
    {
        RoleInfo role = (from r in _roleProvider.GetRolesBasicSearch(Dnn.Portal.PortalId, int.MaxValue, roleName) where String.Equals(r.RoleName, roleName, StringComparison.OrdinalIgnoreCase) select r).FirstOrDefault();
        return role;
    }

    private RoleInfo _GetNewDnnRole(string roleName)
    {
        string fullGroupName = roleName;

        var role = new RoleInfo();
        role.PortalID = Dnn.Portal.PortalId;
        role.RoleName = fullGroupName;
        role.Status = RoleStatus.Approved;
        role.RoleGroupID = Null.NullInteger;
        role.Description = "2sxc test";
        //
        role.ServiceFee = Convert.ToSingle(0);
        role.BillingPeriod = -1;
        role.BillingFrequency = "N";
        //
        role.TrialFee = Convert.ToSingle(0);
        role.TrialPeriod = -1;
        role.TrialFrequency = "N";
        //
        role.IsPublic = false;
        role.AutoAssignment = false;
        return role;
    }

    private UserInfo _GetUserByUserName(string userName)
    {
        UserInfo user = MembershipProvider.Instance().GetUserByUserName(Dnn.Portal.PortalId, userName);
        return user;
    }
}
