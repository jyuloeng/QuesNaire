using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuesNaire.Models
{
    /// <summary>
    /// 用户信息实体类
    /// </summary>
    public class UserInfo
    {
        private int id;         //  用户Id
        private string account;    //  用户账号（邮箱/手机号）
        private string password;   //  用户密码
        private string name;       //  用户名（默认为空）修改信息时可修改
        private string avatar;     //  用户头像（默认为空）注册可不填，修改信息时可修改

        public UserInfo() { }
        public UserInfo(int id, string account, string password, string name, string avatar)
        {
            this.id = id;
            this.account = account;
            this.password = password;
            this.Name = name;
            this.avatar = avatar;
        }

        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        public string Account
        {
            get
            {
                return account;
            }

            set
            {
                account = value;
            }
        }

        public string Password
        {
            get
            {
                return password;
            }

            set
            {
                password = value;
            }
        }

        public string Avatar
        {
            get
            {
                return avatar;
            }

            set
            {
                avatar = value;
            }
        }

        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }
    }
}