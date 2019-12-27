using Newtonsoft.Json;
using QuesNaire.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;
using System;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 报表统计控制器
    /// </summary>
    public class StatisticProjectController : Controller
    {
        // GET: StatisticProject
        public ActionResult Index()
        {
            string naire_id = Request.QueryString["naire_id"];

            NaireWebDataContext db = new NaireWebDataContext();
            Statistic statistic = new Statistic();

            //  先找问卷表拿 问卷标题，描述
            var naires = from r in db.naire_info
                        where r.id == int.Parse(naire_id)
                        select new
                        {
                            r.title,
                            r.hint,
                            r.update_time,
                            r.data
                        };
            statistic.title = naires.FirstOrDefault().title;
            statistic.update_time = naires.FirstOrDefault().update_time;
            statistic.data = naires.FirstOrDefault().data;

            //  然后找问题表拿 问题id，flag，题目，选项
            var questions = from r in db.question_info
                            where r.naire_id == int.Parse(naire_id)
                            select r;

            foreach (question_info question in questions)
            {
                questions q = new questions();
                q.title = question.title;
                q.flag = question.flag;
                var n = JsonConvert.DeserializeObject<List<string>>(question.items);
                if (n!=null)
                    for (var i = 0; i < n.Count; i++)
                    {
                        q.options.Add(n[i]);
                    }
                else
                    q.options = null;

                var reply = from r in db.data_info
                            where r.question_id == question.id
                            select r;
                if(q.flag==2||q.flag==3)
                {
                    var count = JsonConvert.DeserializeObject<List<string>>(reply.FirstOrDefault().data).Count;
                    int[] a = new int[count];
                    foreach (var r in reply)
                    {
                        var index = JsonConvert.DeserializeObject<List<string>>(r.data);
                        for(var i = 0;i<index.Count;i++)
                        {
                            a[i] += int.Parse(index[i]);
                        }

                    }
                    foreach(var i in a)
                    {
                        q.replys.Add(i.ToString());
                    }
                }
                else if(q.flag == 1)
                {
                    foreach(var r in reply)
                    {
                        q.replys.Add(r.data);
                    }
                }
                else if(q.flag == 4)
                {
                    foreach (var r in reply)
                    {
                        q.replys.Add(r.data);
                    }
                }

                    
                statistic.questions.Add(q);
            }
          

            string statistic_info = JsonConvert.SerializeObject(statistic);


            return View();
        }


        public class NaireHeader
        {

            public string title { get; set; }
   
            public string hint { get; set; }

            public string update_time { get; set; }

            public int data { get; set; }
        }
    }
}