using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 项目列表控制器
    /// </summary>
    public class ProjectListController : Controller
    {
        public string id ="0";
        // GET: Project
        public ActionResult Index()
        {
            id =  Request.QueryString["id"];
            if(id!="0")
            {
                HttpCookie cookie = new HttpCookie("user_id");
                cookie.Value = id;
                Response.Cookies.Add(cookie);
            }
            
            return View();
        }
    }
}