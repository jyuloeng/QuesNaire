
using Newtonsoft.Json;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 项目列表控制器
    /// </summary>
    public class ProjectListController : Controller
    {
        public string id { get; private set; }

        // GET: Project
        public ActionResult Index()
        {
            id = Request.QueryString["id"];
            if (id != null)
            {
                HttpCookie cookie = new HttpCookie("user_id");
                cookie.Value = id;
                Response.Cookies.Add(cookie);
            }
            else
            {
                Response.Redirect("~/Login/Index");
                return View();
            }
            if (id != null)
            {
                NaireWebDataContext db = new NaireWebDataContext();
                var rs = from r in db.user_info
                         where id == r.id.ToString()
                         select new
                         {
                             r.account,
                             r.name,
                             r.password,
                             r.avatar
                         };
                var name = rs.FirstOrDefault().name;
                var account = rs.FirstOrDefault().account;
                var avatar = rs.FirstOrDefault().avatar;
                var password = rs.FirstOrDefault().password;
                user.Name = name;
                user.Id = int.Parse(id);
                user.Account = account;
                user.Avatar = avatar;
                user.Password = password;
                HttpCookie cookie = new HttpCookie("user_account");
                cookie.Value = user.Account;
                Response.Cookies.Add(cookie);
                HttpCookie cookie2 = new HttpCookie("user_name");
                cookie2.Value = user.Name;
                Response.Cookies.Add(cookie2);
                HttpCookie cookie3 = new HttpCookie("user_avatar");
                cookie3.Value = user.Avatar;
                Response.Cookies.Add(cookie3);
                HttpCookie cookie4 = new HttpCookie("user_password");
                cookie4.Value = user.Password;
                Response.Cookies.Add(cookie4);
                getUserNaire();
            }
            else
            {
                Response.Redirect("~/Login/Index");
            }
            return View();
        }
        private UserInfo user = new UserInfo();
        [HttpPost]
        public string upImg(string avatar, string id)
        {

            NaireWebDataContext db = new NaireWebDataContext();
            var user = db.user_info.Where(r => r.id.ToString() == id).FirstOrDefault();
            user.avatar = "http://test.xkspbz.com/avatar/img" + GetImage(avatar, id);
            db.SubmitChanges();
            HttpCookie cookie3 = new HttpCookie("user_avatar");
            cookie3.Value = "http://test.xkspbz.com/avatar/img" + GetImage(avatar, id);
            Response.Cookies.Add(cookie3);

            return "1";
        }
        private string GetImage(string imgbyte, string id)
        {
            string result3 = string.Empty;
            try
            {
                string requestUri = "http://test.xkspbz.com/avatar/getImgUrl.php";//请求的url
                HttpClient httpClient = new HttpClient();
                //参数实例 p1=v1&p2=v2
                string str = "img=" + imgbyte + "&id=" + id;
                var content = new StringContent(str, Encoding.UTF8, "application/x-www-form-urlencoded");
                HttpResponseMessage result = httpClient.PostAsync(requestUri, content).Result;
                string result2 = result.Content.ReadAsStringAsync().Result;
                result3 = result2;
            }
            catch (Exception e)
            {
                result3 = "error";
            }
            return result3;
        }
        [HttpPost]
        public string upInfo(string id, string name, string password)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var rs = from r in db.user_info
                     where r.id.ToString() == id
                     select r;
            if (rs.FirstOrDefault() != null)
            {
                rs.FirstOrDefault().name = name;
                rs.FirstOrDefault().password = password;
            }
            db.SubmitChanges();
            HttpCookie cookie2 = new HttpCookie("user_name");
            cookie2.Value = name;
            Response.Cookies.Add(cookie2);
            HttpCookie cookie4 = new HttpCookie("user_password");
            cookie4.Value = password;
            Response.Cookies.Add(cookie4);

            return "1";
        }
        [HttpPost]
        /// <summary>
        /// 获得用户问卷
        /// </summary>
        public void getUserNaire()
        {
            string user_id = Request.Cookies["user_id"].Value;

            NaireWebDataContext db = new NaireWebDataContext();
            var result = from r in db.naire_info
                         where r.user_id.ToString() == user_id
                         select new
                         {
                             r.id,
                             r.title,
                             r.state,
                             r.start_time,
                             r.update_time,
                             r.data
                         };

            ViewBag.NaireInfo = JsonConvert.SerializeObject(result);
        }
        [HttpPost]
        public string addNaire(string userId)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            naire_info naire = new naire_info();
            naire.user_id = int.Parse(userId);
             db.naire_info.InsertOnSubmit(naire);
            db.SubmitChanges();
            int id = naire.id;
            return id.ToString();
        }

    }
}