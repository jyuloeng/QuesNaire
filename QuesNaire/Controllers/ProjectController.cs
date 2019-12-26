using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 问卷详情控制器
    /// </summary>
    public class ProjectController : Controller
    {
        // GET: Project
        public ActionResult Index()
        {
            //  获得问卷Id
            string naire_id = Request.QueryString["naire_id"];

            //  判断问卷是否在预览状态
            string isPreview = Request.QueryString["isPreview"];
            if(isPreview == "1")
            {
                ViewBag.isPreview = "1";
            }

            //  根据问卷Id获得相应问题的Id
            NaireWebDataContext db = new NaireWebDataContext();

            //  判断是否发布了，如果没发布就不能打开
            naire_info stateResult = (from r in db.naire_info
                              where r.id == int.Parse(naire_id) 
                              select r).FirstOrDefault();

            if(stateResult.state == "未发布")
            {
                //  重定向去首页
                if(isPreview != "1")
                {
                    return Redirect("~/Home/Index");
                }  
            }

            //  获得问卷的问题
            var question_header = from r in db.question_info
                                  where r.naire_id == int.Parse(naire_id)
                                  select new
                                  {
                                      r.id,
                                      r.naire_id,
                                      r.title,
                                      r.flag
                                  };

            var questions = (from r in db.naire_info
                             where r.id == int.Parse(naire_id)
                             select new
                             {
                                 r.questions
                             }).FirstOrDefault().questions.ToString();


            NaireJsonObject naire = JsonConvert.DeserializeObject<NaireJsonObject>(questions);

            string question_header_json = JsonConvert.SerializeObject(question_header);
            List<QuestionListItemHeader> naireList = JArray.Parse(question_header_json)
                .ToObject<List<QuestionListItemHeader>>();

            List<QuestionListItem> questionListItem_list = new List<QuestionListItem>();

            for (int i = 0; i < naireList.Count; i++)
            {
                QuestionListItem item = new QuestionListItem();
                item.id = naireList[i].id;
                item.naire_id = naireList[i].naire_id;
                item.title = naireList[i].title;
                item.flag = naireList[i].flag;
                item.list = naire.list[i].items;

                questionListItem_list.Add(item);
            }

            //  根据相应问题的Id获得选项
            NaireHaveIdJsonObject naireHaveId = new NaireHaveIdJsonObject();
            naireHaveId.title = naire.title;
            naireHaveId.hint = naire.hint;
            naireHaveId.list = questionListItem_list;

            //  拼接成JSON给前台生成问卷（挂个data-quesion-id）的属性
            ViewBag.NaireHaveId = JsonConvert.SerializeObject(naireHaveId);

            return View();
        }

        /// <summary>
        /// 获得前台提交的问题回答数据
        /// </summary>
        [HttpPost]
        public void getQuestionData(QuestionDataList questionDataList)
        {

            NaireWebDataContext db = new NaireWebDataContext();
            List<QuestionDataItem> question_data_items = questionDataList.list;
            
            for(int i = 0; i < question_data_items.Count; i++)
            {
                data_info data = new data_info();
                data.question_id = question_data_items[i].id;
                if (question_data_items[i].items.Count > 1)
                {
                    data.data = JsonConvert.SerializeObject(question_data_items[i].items);
                }
                else if(question_data_items[i].items.Count == 1)
                {
                    data.data = question_data_items[i].items[0];
                }

                //  提交存入数据库
                db.data_info.InsertOnSubmit(data);
                db.SubmitChanges();
            }
        }   
    }

    public class QuestionDataList
    {
        public List<QuestionDataItem> list { get; set; }
    }

    public class QuestionDataItem
    {
        public int id { get; set; }
        public List<string> items { get; set; }
    }


    public class QuestionListItemHeader
    {
        public int id { get; set; }

        public int naire_id { get; set; }

        public string title { get; set; }

        public int flag { get; set; }

    }

    public class QuestionListItem
    {
        public int id { get; set; }

        public int naire_id { get; set; }

        public string title { get; set; }

        public int flag { get; set; }

        public List<string> list { get; set; }
    }

    public class NaireHaveIdJsonObject{
        public string title { get; set; }

        public string hint { get; set; }

        public List<QuestionListItem> list { get; set; }
    }
}