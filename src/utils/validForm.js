

export let ruleForm = {
  username: "",
  email: "",
  password: "",
  fullName: "",
  phone: "",
  addr: "",
  checkPass: "",
  isRemember: true,
  role: '普通用户'
}


var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!rule.rule.test(value)) {
    callback(new Error("密码组成：英文字母开头+数字,4~16位"));
  } else {
    callback();
  }
};

var validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

var validateUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!rule.rule.test(value)) {
    callback(new Error("用户名组成：字母数字下划线,4~16位"));
  } else {
    callback();
  }
};

var validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号码"));
  } else if (!rule.rule.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};



export let rules = {
  username: [{
    required: true,
    validator: validateUsername,
    trigger: "blur",
    rule: /^[a-zA-Z_\d]{4,16}$/
  }],
  // 真实姓名
  fullName: [
    {
      required: true,
      message: '请输入真实姓名'
    }
  ],
  addr: [{
    required: true,
    message: "请输入当前住址",
  }],
  password: [{
    required: true,
    validator: validatePass,
    trigger: "blur",
    rule: /^[a-zA-Z][a-zA-Z\d]{4,15}$/
  }],
  checkPass: [{
    required: true,
    validator: validatePass2, 
    trigger: 'blur'
  }],
  email: [{
      required: true,
      message: "请输入邮箱地址",
      trigger: "blur"
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur"]
    }
  ],
  phone: [{
      required: false,
      validator: validatePhone,
      trigger: "blur",
      rule: /^(86)?1[0-9]{10}$/
    }
  ]
}

