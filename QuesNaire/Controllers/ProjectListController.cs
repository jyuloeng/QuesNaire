
using Newtonsoft.Json;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

            getUserInfo();

            getUserNaire();

            return View();
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
                         select new {
                             r.id,
                             r.title,
                             r.state,
                             r.start_time,
                             r.update_time,
                             r.data
                         };

            ViewBag.NaireInfo = JsonConvert.SerializeObject(result);
        }

        /// <summary>
        /// 获得用户信息
        /// </summary>
        public void getUserInfo()
        {
            
            if (Request.Cookies["user_id"] != null)
            {
                NaireWebDataContext db = new NaireWebDataContext();
                var rs = from r in db.user_info
                         where id == r.id.ToString()
                         select new
                         {
                             r.account,
                             r.name,
                             r.avatar
                         };
                var name = rs.FirstOrDefault().name;
                var account = rs.FirstOrDefault().account;
                var avatar = rs.FirstOrDefault().avatar;
                user.Name = name;
                user.Id = int.Parse(id);
                user.Account = account;
                user.Avatar = avatar;
                HttpCookie cookie = new HttpCookie("user_account");
                cookie.Value = user.Account;
                Response.Cookies.Add(cookie);
                HttpCookie cookie2 = new HttpCookie("user_name");
                cookie2.Value = user.Name;
                Response.Cookies.Add(cookie2);
                HttpCookie cookie3 = new HttpCookie("user_avatar");
                cookie3.Value = user.Avatar;
                Response.Cookies.Add(cookie3);
            }
        }

        private UserInfo user = new UserInfo();

        public string upImg(string avatar,string id)
        {

            //NaireWebDataContext db = new NaireWebDataContext();
            //var user = db.user_info.Where(r => r.id.ToString() == id).FirstOrDefault();
            //user.avatar = avatar;
            //db.SubmitChanges();

            return PostResponse("http://test.xkspbz.com/avatar/getImgUrl.php", "img=" + avatar, out string statusCode);
        }

        public string PostResponse(string url, string postData, out string statusCode)
        {
            string result = string.Empty;
            //设置Http的正文
            HttpContent httpContent = new StringContent(postData);
            //设置Http的内容标头
            httpContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
            //设置Http的内容标头的字符
            httpContent.Headers.ContentType.CharSet = "utf-8";
            using (HttpClient httpClient = new HttpClient())
            {
                //异步Post
                HttpResponseMessage response = httpClient.PostAsync(url, httpContent).Result;
                //输出Http响应状态码
                statusCode = response.StatusCode.ToString();
                //确保Http响应成功
                if (response.IsSuccessStatusCode)
                {
                    //异步读取json
                    result = response.Content.ReadAsStringAsync().Result;
                }
            }
            return result;
        }
    }
}