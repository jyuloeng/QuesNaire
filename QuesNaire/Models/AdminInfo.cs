using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuesNaire.Models
{
    /// <summary>
    /// 管理员信息实体类
    /// </summary>
    public class AdminInfo
    {
        private int manage_id;         // 管理员Id
        private string manage_account;    //  管理员账号
        private string manage_password;   //  管理员密码
        private string manage_name;       //  管理员账号名

        public AdminInfo(){}

        public AdminInfo(int manage_id, string manage_account, string manage_password, string manage_name)
        {
            this.Manage_id = manage_id;
            this.Manage_account = manage_account;
            this.Manage_password = manage_password;
            this.Manage_name = manage_name;
        }

        public int Manage_id { get => manage_id; set => manage_id = value; }
        public string Manage_account { get => manage_account; set => manage_account = value; }
        public string Manage_password { get => manage_password; set => manage_password = value; }
        public string Manage_name { get => manage_name; set => manage_name = value; }
    }
}