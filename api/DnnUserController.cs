using DotNetNuke.Entities.Users;
using DotNetNuke.Security;
using System.Web.Http;
using DotNetNuke.Security.Membership;
using ToSic.SexyContent.WebApi;

public class DnnUserController : SxcApiController
{
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
  public bool Register(string email, string password)
  {
    // TODO: Security!!!

    try
    {
      // 1. Check Password is Valid
      if (!UserController.ValidatePassword(password)) return false;

      // 2. Check Email is Valid
      // TODO

      // 3. Add User
      var user = new UserInfo
      {
        PortalID = Dnn.Portal.PortalId,
        Username = email,
        Email = email,
        DisplayName = email,
        Membership = { Password = password, Approved = true }
      };

      var CreateStatus = UserController.CreateUser(ref user);

      // if user is created, than login user
      return (CreateStatus == UserCreateStatus.Success) && Login(email, password);
    }
    catch
    {
      return false;
    }
  }
}
