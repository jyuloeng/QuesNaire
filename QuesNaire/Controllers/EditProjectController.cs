using Newtonsoft.Json;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 编辑项目控制器
    /// </summary>
    public class EditProjectController : Controller
    {
        private string user_id;  //  用户ID
        private string naire_id; //  问卷ID

        // GET: EditProject
        public ActionResult Index()
        {
            naire_id = Request.QueryString["naire_id"];

            if (naire_id == null)
            {
                string start_time = DateTime.Now.ToShortDateString().ToString();
                //  创建一个开始时间的cookie挂在浏览器上
                HttpCookie start_time_cookie = new HttpCookie("start_time");
                start_time_cookie.Value = start_time;
                Response.Cookies.Add(start_time_cookie);
            }
            else
            {
                //  创建一个问卷id的cookie挂在浏览器上
                HttpCookie naire_id_cookie = new HttpCookie("naire_id");
                naire_id_cookie.Value = naire_id;
                Response.Cookies.Add(naire_id_cookie);
            }

            return View();
        }

        /// <summary>
        /// 获得前台传递的json数据
        /// </summary>
        public ContentResult getNaireJson(NaireJsonObject naireJson)
        {
            user_id = Request.Cookies["user_id"].Value;


            if (naire_id == null)
            {
                createProject(naireJson);
            }
            else
            {
                naire_id = Request.Cookies["naire_id"].Value;
                editProject(naireJson);
            }

            return Content(naire_id);
        }


        /// <summary>
        /// 创建项目
        /// </summary>
        private void createProject(NaireJsonObject naireJson)
        {
            //  开始时间与最后修改时间
            string start_time = Request.Cookies["start_time"].Value;
            string edit_time = DateTime.Now.ToShortDateString().ToString();

            NaireWebDataContext db = new NaireWebDataContext();
            naire_info naire = new naire_info();

            naire.user_id = int.Parse(user_id);
            naire.title = naireJson.title;
            naire.state = "未发布";
            naire.start_time = start_time;
            naire.update_time = edit_time;
            naire.questions = JsonConvert.SerializeObject(naireJson);

            //  提交问卷
            db.naire_info.InsertOnSubmit(naire);
            db.SubmitChanges();

            //  获得naire_id的最大值
            var naire_num = db.naire_info.Max(p => p.id);
            naire_id = naire_num.ToString();

            //  提交每一个问题
            for (int i = 0; i < naireJson.list.Count; i++)
            {
                question_info question = new question_info();
                question.naire_id = naire_num; 
                question.title = naireJson.list[i].title;
                question.flag = naireJson.list[i].flag;
                question.items = JsonConvert.SerializeObject(naireJson.list[i].items);

                db.question_info.InsertOnSubmit(question);
                db.SubmitChanges();
            }
        }

        /// <summary>
        /// 编辑项目
        /// </summary>
        private void editProject(NaireJsonObject naireJson)
        {
            string edit_time = DateTime.Now.ToShortDateString().ToString();
        }
    }
}
