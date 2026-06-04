# COMP1531 Week 1 总结：Software + JavaScript + Git

> 来源：
>
> - `01.2 - Software.pdf`
> - `01.3 - JavaScript.pdf`
> - `01.4 - Git (Solo Usage).pdf`
> - `01.5 - Git (Team Usage).pdf`
>
> 这份总结用 tutor 讲解风格，把 Week 1 的四份课件串成一条主线：软件工程不是只写代码，而是用合适的语言、流程和协作工具，稳定地把软件交付给真实用户。

## 1. COMP1531 的核心：Software Engineering

COMP1531 不只是教你 JavaScript 或 Git。真正主题是 software engineering。

Computer Science 更关心：

- 电脑怎么工作；
- 我们怎样让电脑做事；
- 什么问题可以计算；
- 算法和效率如何。

Software Engineering 更关心：

- 给真实的人构建软件；
- 构建“正确的软件”；
- 用正确 practices 构建；
- 让软件长期 maintainable；
- 团队协作、测试、部署、迭代和质量控制。

Tutor 可能会这样解释：Computer Science 问“这个问题怎么解”；Software Engineering 问“我们怎么和一群人一起，把这个解法做成一个用户真的能用、以后还能维护的产品”。

## 2. 为什么软件工程重要？

学生作业里的代码常常是：

- 能跑就行；
- 交完没人再碰；
- bug 影响范围小；
- 不需要长期维护。

Industry code 完全不同：

- 可能有 millions of users；
- 支持很多 devices；
- 出错可能造成钱、隐私、安全甚至生命风险；
- 代码会被很多人长期修改。

所以软件工程不只关心 functionality，还关心：

- scalability；
- maintainability；
- security；
- reliability；
- collaboration。

一句话：代码能跑只是起点，不是终点。

## 3. Software Development Life Cycle (SDLC)

SDLC 是 structured approach to software development。

常见阶段可以理解为：

1. Requirements gathering：弄清楚用户/客户真正需要什么；
2. System design：设计系统结构和技术方案；
3. Implementation：写代码；
4. Testing：验证代码是否满足需求；
5. Deployment：把软件发布给用户；
6. Maintenance：修 bug、加功能、适应变化。

为什么需要 structured process？

- Efficiency：工作顺序更合理；
- Predictability：团队知道什么时候该做什么；
- Quality assurance：更少错误，更容易维护；
- Communication：大家不会各写各的。

Tutor 类比：盖房子不能一上来就随便砌墙。你需要图纸、材料、工人、检查。软件也是，只不过“塌了”的形式是 bug、数据丢失、上线失败和团队崩盘。

## 4. 软件质量和生产力的三大支柱

讲义给出 3 pillars：

### People

软件由人构建。人的能力、沟通、责任感、团队习惯会直接影响结果。

### Process

流程让团队按合理方式推进，减少混乱。

### Technology

工具和自动化提高效率，例如：

- version control；
- testing frameworks；
- CI/CD；
- package managers；
- deployment tools。

注意：工具不是万能的。没有好的 people 和 process，工具只会让混乱变得更快。

## 5. 常见 development models

### Waterfall

线性流程：

```text
requirements -> design -> implementation -> testing -> deployment -> maintenance
```

优点是结构清楚；缺点是如果需求变化，返工成本很高。

### Prototyping

先做 prototype，快速拿反馈。适合需求还不清晰的时候。

### Iterative Development

持续改进，每一轮都让产品更接近目标。

### Agile

强调快速、协作、反馈和变化响应。

COMP1531 project 会让你体验 group project、GitLab workflow、testing、APIs、code reviews、CI/CD 等接近真实工程实践的内容。

## 6. JavaScript 为什么重要？

JavaScript 很 quirky，因为它最早设计得很快，而且 web 上一旦功能发布就很难删除。但它仍然非常重要：

- web 上使用极广；
- 前端、后端都能用；
- NodeJS 让 JS 能在浏览器外运行；
- open-source ecosystem 和 package manager 很强；
- 适合快速开发 web app。

这门课不会让你变成 JS 专家。Week 1 的目标是：你已经会 C，所以快速掌握 JS 和 C 的差异，够用来写 labs 和 project。

## 7. NodeJS 是什么？

NodeJS 让 JavaScript 可以在 browser 之外运行。

可以把它类比成：

- C 用 `gcc` 编译/运行；
- JS 用 `node` 解释/运行。

讲义强调 NodeJS 是 interpreted-style workflow：

- 修改代码后不需要额外编译步骤；
- 运行时编译/解释，方便但可能比 compiled C 慢；
- 开发体验更快。

例子：

```bash
node file.js
```

## 8. JavaScript 基础：variables 和 printing

常见变量声明：

```js
const name = 'Sally';
let age = 18;
console.log(name);
```

### `const`

用于不打算重新赋值的变量。

注意：如果 `const` 指向 object/array，不能把变量名改指向另一个 object，但 object 内部内容仍可能被修改。

### `let`

用于之后可能重新赋值的变量。

### 尽量少用 `var`

现代 JS 中通常优先用 `const` 和 `let`，因为 `var` 的 scope 行为容易让初学者踩坑。

Tutor 提醒：默认先用 `const`。只有确实需要改变量绑定时，再换成 `let`。

## 9. Strings 和 string interpolation

普通拼接：

```js
const name = 'Sally';
console.log('Hello ' + name);
```

Template literal 使用 backtick：

```js
const name = 'Sally';
const age = 18;
console.log(`${name} is ${age} years old`);
```

Template literal 更适合插入变量和表达式，读起来也更接近自然语言。

## 10. Control structures

JS 的 `if`、`else if`、`else`、`while`、`for` 和 C 很像：

```js
if (score >= 50) {
  console.log('pass');
} else {
  console.log('fail');
}
```

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

注意 JS 的比较有两套：

- `==` 会做 type coercion；
- `===` 更严格，通常更推荐。

虽然讲义这一页没有展开，但写 project 时要养成用 `===` 的习惯。

## 11. Functions

JS function 和 C function 结构相似，但 JS 不要求你写类型：

```js
function min(a, b) {
  if (a < b) {
    return a;
  }
  return b;
}

console.log(min(3, 7));
```

对比 C：

```c
int min(int a, int b) {
    if (a < b) {
        return a;
    }
    return b;
}
```

最大差异：

- JS 变量和参数没有 C 那种显式类型；
- JS 更灵活，但也更容易把错误留到 runtime；
- 后面工程实践会靠 tests、lint、TypeScript/typing 等工具补强。

## 12. Collections：sequential vs associative

讲义把 collections 分成两类。

### Sequential collections

用整数 index 访问，元素有顺序。

JS 里主要是 arrays：

```js
const names = ['Ava', 'Ben', 'Chris'];
console.log(names[0]); // Ava
```

### Associative collections

用 string key 访问，更像“名字 -> 值”的映射。

JS 里常用 objects：

```js
const person = {
  name: 'Sally',
  age: 18,
  height: '187cm',
};

console.log(person.name);
console.log(person['age']);
```

## 13. Arrays

Array 可以存多个值：

```js
const nums = [10, 20, 30];
```

访问：

```js
console.log(nums[1]); // 20
```

添加：

```js
nums.push(40);
```

遍历：

```js
for (const value of nums) {
  console.log(value);
}
```

### `for...in` vs `for...of`

讲义特别提到：

- `for...in` loops through keys/indexes；
- `for...of` loops through values。

例子：

```js
const names = ['Ava', 'Ben'];

for (const i in names) {
  console.log(i);        // 0, 1
}

for (const name of names) {
  console.log(name);     // Ava, Ben
}
```

Tutor 提醒：遍历 array 时，多数时候你想要 `for...of`，因为你通常关心 value，不关心 index。

## 14. Objects

Object 是一组 property/value pairs：

```js
const car = {
  brand: 'Fiat',
  model: 500,
  colour: 'white',
};
```

Object 适合表示一个“东西”的多个属性，比如：

- user；
- quiz；
- message；
- channel；
- auth session。

读取 property：

```js
console.log(car.brand);
console.log(car['colour']);
```

修改 property：

```js
car.colour = 'red';
```

获取 object 信息：

```js
Object.keys(car);    // ['brand', 'model', 'colour']
Object.values(car);  // ['Fiat', 500, 'white']
Object.entries(car); // [['brand', 'Fiat'], ...]
```

## 15. Arrays are objects

讲义提醒：arrays 也是 objects。

所以 array 会有：

- properties，例如 `length`；
- methods，例如 `push()`。

```js
const arr = [1, 2, 3];
console.log(arr.length);
arr.push(4);
```

这解释了为什么 array 不只是“连续的一排值”，它还自带很多功能。

## 16. Array of objects：project 中非常常见

真实 backend 里，经常会处理“对象列表”：

```js
const students = [
  { name: 'Ava', mark: 80 },
  { name: 'Ben', mark: 62 },
  { name: 'Chris', mark: 49 },
];

for (const student of students) {
  if (student.mark >= 50) {
    console.log(`${student.name} passed`);
  }
}
```

Tutor 提醒：COMP1531 project 里很多数据结构，本质都是 array of objects。你要练的是：怎么找到某个 object，怎么更新它，怎么验证输入是否合法。

## 17. Git 为什么不是 Dropbox？

简单文件同步工具有：

- file syncing；
- basic version history；
- collaboration features。

但它们不适合复杂软件工程，因为：

- 不够细致地追踪代码变化；
- 不适合程序员协作；
- 不擅长处理多人同时修改、分支、合并、review。

Git 提供的是 version control：

- 记录代码历史；
- 支持多人并行工作；
- 每个开发者本地都有完整仓库；
- 可以和 cloud remote 同步。

## 18. Git、GitHub、GitLab、Bitbucket 的区别

Git 是 command line program，也是 version control system 本身。

GitHub/GitLab/Bitbucket 是基于 Git 的 web platform：

- 提供网页界面；
- 管理 repositories；
- 支持 merge requests / pull requests；
- 支持 issues、CI/CD、permissions 等。

COMP1531 使用 GitLab。

## 19. Git solo workflow

### `git clone`

从 remote repository 复制一份到本地：

```bash
git clone <repo-url>
```

### `git status`

查看当前工作区状态：

```bash
git status
```

它会告诉你：

- 哪些文件 modified；
- 哪些文件 untracked；
- 哪些文件 staged；
- 当前 branch 状态。

### `git log`

查看 commit history：

```bash
git log
```

### `git diff`

看当前改动和上次 commit 的差异：

```bash
git diff
```

Tutor 提醒：commit 前看 `git diff` 是好习惯。它能帮你发现“我怎么把 debug print 也提交了”。

### `git add`

把文件加入 staging area：

```bash
git add file.js
git add --all
```

### `git commit`

把 staged changes 变成一个 snapshot：

```bash
git commit -m "Implement quiz creation"
```

### `git push`

把本地 commit 推到 remote：

```bash
git push
```

### `git pull`

把 remote 的更新拉到本地：

```bash
git pull
```

## 20. Git 的三个区域

理解 Git 最好记住三个区域：

```text
working directory -> staging area -> repository history
```

- working directory：你正在编辑的文件；
- staging area：准备放进下一次 commit 的改动；
- repository history：已经 commit 的历史。

对应命令：

```text
edit files -> git add -> git commit -> git push
```

## 21. Git tree model 和 branches

Git 可以理解成 commit tree：

- 每个 commit 是一个节点；
- commit 有 parent；
- 一个 commit 可以有多个 children；
- branch 本质上是指向某个 commit 的 pointer。

`master` 或 `main` 不是特殊魔法，它只是一个 branch pointer，通常指向主线最新 commit。

创建 branch 的意义：

- 独立开发功能；
- 不破坏 main branch；
- 安全实验；
- 多人并行工作。

一个本地仓库同一时间只能 checkout 一个 branch。切 branch 前最好保持 working directory 干净，也就是没有未提交的 staged/unstaged changes。

## 22. Merging

Merging 是把另一个 branch 的工作整合进当前 branch。

常见场景：

1. 你开发 feature 时，经常把 main 的最新变化 merge 进来，避免落后太多；
2. feature 完成并通过 review 后，把 feature branch merge 回 main。

为什么要经常同步 main？

- 减少最后的大冲突；
- 尽早发现 integration 问题；
- 确保你的 feature 基于最新代码。

## 23. Merge conflicts

Merge conflict 通常发生在：

- 两个人改了同一文件同一位置；
- Git 不知道该保留哪一边；
- 需要人类决定最终代码。

解决 conflict 的思路：

1. 读懂两边改动；
2. 保留正确逻辑；
3. 删除 conflict markers；
4. 运行 tests；
5. `git add`；
6. commit merge resolution。

不要机械地选 ours/theirs。真正目标是保留正确行为。

## 24. Merge Requests (MR)

在专业环境中，通常不会直接 push/merge 到 main。

Merge Request 是 GitLab 上的 web workflow，用来：

- 展示你的 changes；
- 让队友 review；
- 讨论和反馈；
- 运行 automated tests / CI/CD；
- 控制 approval；
- 保护 main branch。

MR 的价值：

- 提高 code quality；
- 分享知识；
- 提前发现 bug；
- 防止 accidental breakage。

## 25. Week 1 实战建议

### JavaScript 练习

1. 写 function：输入两个数，返回较小值；
2. 练 `const`/`let`；
3. 练 template literal；
4. 写 array 遍历；
5. 写 object；
6. 写 array of objects，并按条件筛选。

### Git 练习

每次写代码都按这个节奏：

```bash
git status
git diff
git add <files>
git commit -m "clear message"
git push
```

团队项目时：

```bash
git pull
git checkout -b feature/something
# work, commit, push
# open MR on GitLab
```

## 26. 本周 takeaway

1. Software engineering 是关于 people、process、technology 的组合，不只是 coding。
2. JavaScript 是课程项目的主要语言，先掌握够用的 syntax 和 data structures。
3. Git 是协作的基础；branch、merge、MR 是团队开发的核心。
4. 写代码前想清楚需求，写代码后用 tests 和 review 保护质量。

Tutor 最后会说：COMP1531 里你会开始从“我能写出代码”转向“我们能一起维护一个产品”。这是从学生作业到工程实践的关键转变。

# COMP1531 全课程详细总结：从写代码到做软件工程

> 来源：01.1 到 10.2 的 COMP1531 lecture slides。
>
> 前面 Week 1 已经讲过 Software、JavaScript、Git。下面这部分把整门课按 lecture 顺序补全，重点不是背定义，而是让你知道：每一章在项目里解决什么问题，为什么 tutor 会反复强调这些工程习惯。

## 27. Course Overview：1531 到底想训练什么

COMP1531 的核心不是“学一个新语言”，而是学怎么把一个多人维护的软件项目做出来。

COMP1511/1521 更像：

```text
给你一个明确问题，你写一个程序解决它。
```

COMP1531 更像：

```text
需求会变，队友会改同一个项目，代码要长期维护，用户要通过 API 使用系统。
```

所以课程重点会变成：

- team-based software engineering；
- requirements；
- iterative development；
- testing；
- Git collaboration；
- HTTP APIs；
- maintainability；
- deployment；
- authentication；
- validation；
- project process。

你会发现很多内容不是“语法知识”，而是“工程约束”：

```text
代码能跑只是最低要求。
代码要可读、可测、可维护、可协作，才算软件工程。
```

这门课的项目通常会模拟一个真实 web backend：你们写 server、routes、data store、tests、auth、error handling，然后靠 GitLab、CI、MR、iteration 管理团队开发。

Tutor 视角：1531 最难的不是某个函数怎么写，而是“我写的东西怎么不把队友和未来的自己害死”。

## 28. Software：软件工程为什么不只是 coding

Software engineering 关心的是：

```text
如何系统地、可靠地、可持续地生产软件。
```

一个软件项目失败，原因通常不是“某个人不会写 if statement”，而是：

- 需求没搞清楚；
- 队友理解不一致；
- 没有测试；
- 修改一个功能导致另一个功能坏了；
- 代码越来越乱，没人敢改；
- 没有版本控制；
- 没有部署流程；
- 用户真正想要的和团队做出来的不一样。

所以软件工程会反复讲三个维度：

```text
People
Process
Technology
```

### People

软件是人一起写出来的。团队里会有：

- 沟通成本；
- 不同水平；
- 时间安排冲突；
- code ownership；
- review 和 feedback；
- conflict resolution。

一个会写代码但不沟通的人，在团队项目里可能造成很大风险。

### Process

Process 是“我们怎么工作”：

- 怎么收集需求；
- 怎么分任务；
- 怎么 review；
- 怎么测试；
- 怎么发布；
- 怎么处理 bug；
- 怎么决定下一步做什么。

Process 不是官僚主义。好的 process 是为了减少混乱。

### Technology

Technology 是工具和技术：

- JavaScript/TypeScript；
- Git/GitLab；
- Jest；
- Express；
- npm；
- ESLint；
- CI/CD；
- deployment platform。

工具本身不是目的。工具是为了支持团队更可靠地交付软件。

## 29. JavaScript / TypeScript 基础：项目语言够用版

COMP1531 用 JavaScript/TypeScript，是因为它非常适合写 web backend 和测试。

你需要先掌握这些基础：

- variables；
- functions；
- arrays；
- objects；
- modules；
- callbacks；
- higher-order functions；
- JSON-like data；
- TypeScript type annotations。

### `const`、`let`、`var`

现代 JS/TS 优先：

```ts
const name = 'Hayden';
let count = 0;
```

区别：

- `const`：变量绑定不能重新赋值；
- `let`：可以重新赋值；
- `var`：老语法，有 function scope 和 hoisting 问题，尽量不用。

注意：

```ts
const arr = [];
arr.push(1);
```

这是允许的。因为 `const` 保护的是变量绑定，不是 object/array 内部内容。

### Objects 是项目核心数据结构

COMP1531 project 里大量数据会长这样：

```ts
const user = {
  userId: 1,
  email: 'a@b.com',
  nameFirst: 'Ada',
  nameLast: 'Lovelace',
};
```

你要熟悉：

```ts
user.email
user['email']
```

Array of objects 更常见：

```ts
const users = [
  { userId: 1, email: 'a@b.com' },
  { userId: 2, email: 'c@d.com' },
];
```

项目里很多函数其实都是：

```text
在 array of objects 里找东西、加东西、改东西、删东西。
```

### Functions

函数是行为的基本单位：

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

箭头函数：

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

项目里你会经常写 service/helper function：

```ts
function findUserById(userId: number) {
  return data.users.find(user => user.userId === userId);
}
```

Tutor 重点：函数要小而清楚。一个函数最好只做一件事。

## 30. Git Solo Usage：个人开发的安全节奏

Git 不是 Dropbox。Git 是 version control system。

它帮你记录：

- 哪些文件改了；
- 每次 commit 的快照；
- 谁改的；
- 为什么改；
- 如何回到之前版本；
- 如何把不同人的工作合并。

个人 workflow：

```bash
git status
git diff
git add <files>
git commit -m "meaningful message"
git push
```

### `git status`

用来看当前状态：

- modified；
- staged；
- untracked；
- branch ahead/behind。

写代码前后都应该看。

### `git diff`

用来看你到底改了什么。

Tutor 会很强调：

```text
不要在没看 diff 的情况下 commit。
```

因为你可能不小心提交了 debug code、临时文件、错误改动。

### `git add`

把 change 放进 staging area。

Staging area 的意义：

```text
你可以选择这次 commit 包含哪些改动。
```

### `git commit`

commit 是一个有意义的保存点。

好的 commit message 应该讲：

```text
这次改动为什么存在。
```

不要写：

```text
fix
changes
stuff
final
```

### `git push`

把本地 commits 推到 remote。

没有 push，GitLab 上就没有你的最新工作，队友也看不到。

## 31. Git Team Usage：branch、merge、MR

团队里不能所有人直接改 main。

常见团队 workflow：

```bash
git checkout main
git pull
git checkout -b feature/auth-login
# work
git add .
git commit -m "implement login validation"
git push -u origin feature/auth-login
# open Merge Request
```

### Branch

Branch 是一条独立开发线。

好处：

- 不影响 main；
- 可以并行开发；
- 方便 code review；
- 出问题可以丢弃或重做。

### Merge Request

MR 是团队开发的核心。

它提供：

- code review；
- discussion；
- CI result；
- approval；
- merge control。

MR 不是形式主义。它是保护 main 的 gate。

### Merge conflict

Conflict 发生在：

```text
两个人改了同一个文件的同一部分，Git 不知道该保留谁。
```

解决 conflict 的原则：

1. 读懂两边改动；
2. 保留正确逻辑；
3. 删除 conflict markers；
4. 运行 tests；
5. commit resolution。

Conflict markers 长这样：

```text
<<<<<<< HEAD
当前分支内容
=======
要合并进来的内容
>>>>>>> other-branch
```

不要直接乱删。先理解。

## 32. Teamwork：团队不是自动发生的

COMP1531 的 major project 是 team project，所以 Teamwork 不是软技能配菜，而是 assessed skill。

一个团队要正常工作，需要：

- clear roles；
- regular communication；
- task tracking；
- shared expectations；
- agreed coding style；
- review process；
- conflict handling；
- accountability。

### Team contract

Team contract 通常包括：

- 什么时候开会；
- 用什么沟通工具；
- 怎么分任务；
- missed deadline 怎么办；
- code review 规则；
- merge 规则；
- contribution expectation。

它的意义不是“写给老师看”，而是提前减少误会。

### Meeting

好的 meeting 应该有：

- agenda；
- decision；
- action items；
- owner；
- deadline。

坏 meeting 是：

```text
大家聊了很久，但没人知道下一步谁干什么。
```

### Task decomposition

任务不要写成：

```text
做 auth
```

这太大。

更好的拆法：

```text
实现 authRegister 输入校验
实现 authLogin token 生成
写 authRegister tests
把 auth routes 接到 server
更新 data model
```

每个任务应该可以被一个人理解、实现、测试、review。

## 33. Multi-file and Importing：把代码拆开

项目变大后，不能所有代码都塞进一个文件。

拆文件的原因：

- easier to navigate；
- reduce merge conflicts；
- separate concerns；
- improve testability；
- allow reuse。

常见结构：

```text
src/
  server.ts
  dataStore.ts
  auth.ts
  channels.ts
  users.ts
  helper.ts
```

### Export / Import

如果一个文件要给别人用：

```ts
export function authLogin(...) {
  ...
}
```

另一个文件使用：

```ts
import { authLogin } from './auth';
```

Default export：

```ts
export default function foo() {}
```

Named export 更适合多人项目，因为 import 时名字清楚。

### Separation of concerns

`server.ts` 不应该塞满业务逻辑。

比较好的分工：

- `server.ts`：HTTP route，负责 request/response；
- `auth.ts`：auth 业务逻辑；
- `dataStore.ts`：读写数据；
- `helper.ts`：共用小工具。

Tutor 风格提醒：拆文件不是为了显得高级，而是为了让每个文件的责任清楚。

## 34. Package Management：npm 和依赖

Package management 解决的问题：

```text
项目需要别人写好的 libraries，如何安装、记录、共享、更新？
```

Node 项目核心文件：

```text
package.json
package-lock.json
node_modules/
```

### `package.json`

记录：

- project scripts；
- dependencies；
- devDependencies；
- metadata。

常见 scripts：

```json
{
  "scripts": {
    "test": "jest",
    "start": "ts-node src/server.ts",
    "lint": "eslint ."
  }
}
```

运行：

```bash
npm test
npm run lint
npm start
```

### dependencies vs devDependencies

`dependencies`：

```text
程序运行时需要。
```

例如 Express。

`devDependencies`：

```text
开发/测试时需要，生产运行不一定需要。
```

例如 Jest、ESLint、TypeScript。

### `package-lock.json`

锁定具体版本，保证大家装到一致的依赖树。

不要手动乱改 lock file。正常用 `npm install` 生成和更新。

### `node_modules`

真正安装的依赖文件夹。

通常不要 commit `node_modules`，因为它巨大，而且可以由 package files 重新生成。

## 35. Dynamic Verification：用 tests 检查运行行为

Verification 是确认：

```text
我们做出来的东西符合预期。
```

Dynamic verification 是运行程序来检查，比如 unit tests。

COMP1531 常用 Jest。

### Test 的基本形状

```ts
test('adds two numbers', () => {
  expect(add(2, 3)).toStrictEqual(5);
});
```

常见 matcher：

```ts
expect(x).toStrictEqual(y);
expect(x).toEqual(y);
expect(x).toBe(y);
expect(fn).toThrow();
```

### Good test

好的 test 应该：

- 有清楚名字；
- 输入明确；
- expected output 明确；
- 独立；
- 可重复；
- 不依赖 test order。

### Black-box vs white-box

Black-box testing：

```text
只看输入输出，不管内部怎么写。
```

White-box testing：

```text
根据内部实现设计测试。
```

COMP1531 项目前期更强调 black-box，因为 spec 才是合同。

### Edge cases

不要只测 happy path。

例如注册用户：

- 正常 email；
- invalid email；
- duplicate email；
- password 太短；
- name 太短/太长；
- 空字符串。

Tutor 提醒：test 的价值不是证明你代码能跑一次，而是保护以后改代码时不把旧行为弄坏。

## 36. Continuous Integration：让机器替团队守门

CI 是 Continuous Integration。

意思是：

```text
每次 push / MR 时，自动运行 tests、lint、typecheck 等检查。
```

为什么需要 CI？

- 人会忘记跑 tests；
- 每个人本地环境可能不同；
- main branch 需要保护；
- MR review 时要有自动证据。

GitLab CI 常见文件：

```text
.gitlab-ci.yml
```

里面定义 pipeline jobs。

一个简单 pipeline 可能有：

```text
install
lint
test
build
```

CI fail 的意义：

```text
不是 GitLab 在刁难你，而是它告诉你这次改动没有达到团队约定的质量门槛。
```

团队规则通常应该是：

```text
CI 不绿，不 merge。
```

## 37. Static Verification：不运行程序也能找问题

Static verification 是：

```text
不执行程序，通过分析代码发现错误。
```

包括：

- TypeScript type checking；
- ESLint；
- compiler checks；
- code review；
- static analysis tools。

Dynamic verification 问：

```text
运行起来结果对不对？
```

Static verification 问：

```text
代码形状本身有没有明显风险？
```

TypeScript 的价值：

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

如果你传：

```ts
add('hello', 3);
```

type checker 可以提前抓到。

但 static verification 不是万能的。

它通常抓不到：

- 需求理解错误；
- algorithm wrong but type correct；
- missing edge case；
- 用户体验问题。

所以 static 和 dynamic 要一起用。

## 38. Linting：统一风格，减少低级错误

Linting 是 static verification 的一种。

ESLint 可以检查：

- unused variables；
- inconsistent indentation；
- missing semicolons；
- unsafe patterns；
- bad naming；
- overly complex code；
- style violations。

Lint 的目的不是“老师喜欢这种格式”，而是：

```text
团队代码看起来像同一个人写的，review 时大家专注逻辑而不是空格争吵。
```

常见命令：

```bash
npm run lint
```

Lint error 要修。

Lint warning 也不要长期堆着，因为 warning 太多以后，真正重要的问题会被淹没。

Tutor 提醒：formatting 工具和 lint rules 是团队协议的一部分。你不需要每条都热爱，但你要让项目一致。

## 39. HTTP Servers：backend API 的核心

HTTP server 是 COMP1531 project 的核心之一。

基本模型：

```text
Client 发 request
Server 处理 request
Server 返回 response
```

Request 包含：

- method；
- path；
- headers；
- query parameters；
- body。

Response 包含：

- status code；
- headers；
- body。

### HTTP methods

常见：

```text
GET     读取资源
POST    创建/执行动作
PUT     整体更新
PATCH   部分更新
DELETE  删除
```

### Status codes

常见：

```text
200 OK
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

项目里要区分：

- input invalid：400；
- token invalid/missing：401；
- 用户没权限：403；
- 资源不存在：404。

### Express route

典型结构：

```ts
app.get('/echo', (req, res) => {
  const message = req.query.message as string;
  res.json({ message });
});
```

POST body：

```ts
app.post('/auth/register', (req, res) => {
  const { email, password, nameFirst, nameLast } = req.body;
  const result = authRegister(email, password, nameFirst, nameLast);
  res.json(result);
});
```

Route 层应该薄：

```text
从 HTTP request 取参数；
调用业务函数；
把结果转成 HTTP response。
```

不要把全部业务逻辑塞进 route。

## 40. HTTP Testing：测试 server 行为

HTTP testing 是从 client 角度测试 API。

它不是直接调用：

```ts
authRegister(...)
```

而是发 HTTP request：

```text
POST /auth/register
```

然后检查 response。

你要测试：

- status code；
- JSON body；
- state change；
- error behavior；
- auth token behavior。

测试 server 常见步骤：

```text
beforeEach 清空 data；
发 request；
检查 response；
必要时再发另一个 request 验证状态。
```

为什么要 HTTP tests？

因为真实用户不会直接调用你的 internal function。用户只会通过 HTTP API 使用系统。

HTTP tests 可以抓到：

- route path 写错；
- method 写错；
- query/body 参数读取错；
- status code 错；
- JSON response shape 错；
- server integration bug。

Tutor 提醒：unit test 证明小函数对；HTTP test 证明整个 API 从外面看是对的。

## 41. Advanced Functions：函数是一等公民

JavaScript/TypeScript 里，function 可以像 value 一样被传递。

这叫 first-class functions。

你可以：

- 把 function 存进 variable；
- 把 function 当作 argument；
- 从 function return function。

### Higher-order functions

Higher-order function 是：

```text
接收 function 或返回 function 的函数。
```

Array 常用：

```ts
const nums = [1, 2, 3, 4];

nums.map(n => n * 2);
nums.filter(n => n % 2 === 0);
nums.find(n => n > 2);
nums.some(n => n === 3);
nums.every(n => n > 0);
nums.reduce((sum, n) => sum + n, 0);
```

这些在 project 里非常常用：

- find user；
- filter channels；
- map messages；
- reduce statistics。

### Callback

Callback 是传进去之后稍后被调用的 function。

在 Express 里：

```ts
app.get('/path', (req, res) => {
  ...
});
```

第二个参数就是 callback。HTTP request 来了，Express 调它。

### Closure

Closure 是 function 记住它定义时周围的变量。

简单理解：

```ts
function makeAdder(x: number) {
  return (y: number) => x + y;
}
```

返回的 function 仍然记得 `x`。

在课程项目里，closure 不一定大量手写，但理解它能帮你看懂 JS 行为。

## 42. Persistence：数据不能只活在内存里

如果数据只存在变量里：

```text
server restart -> data gone
```

Persistence 解决的是：

```text
程序结束后，数据仍然保存。
```

COMP1531 project 里常见做法是 JSON file persistence。

基本套路：

```ts
import fs from 'fs';

function save() {
  fs.writeFileSync('data.json', JSON.stringify(data));
}

function load() {
  if (fs.existsSync('data.json')) {
    data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  }
}
```

重点：

- memory data 是程序运行时用的；
- disk data 是长期保存的；
- 每次修改 data 后要 save；
- server start 时要 load。

JSON stringify/parse：

```ts
const text = JSON.stringify(obj);
const obj = JSON.parse(text);
```

常见坑：

- 忘记 save，测试时内存里看起来对，重启后没了；
- load 时 data shape 不匹配；
- 写文件时路径错；
- 把 function、undefined 等不能正常 JSON 化的东西放进 data。

## 43. Exceptions：错误处理不是随便 return

Exception 是一种处理异常情况的机制。

TypeScript/JavaScript：

```ts
throw new Error('message');
```

捕获：

```ts
try {
  risky();
} catch (e) {
  ...
}
```

在 COMP1531 server 里，错误处理通常要映射到 HTTP status code。

例如：

```text
Input invalid -> 400
Token invalid -> 401
Permission denied -> 403
```

业务函数可以：

- return error object；
- throw custom error；
- 用 helper 包装错误。

关键不是哪一种绝对最好，而是团队一致。

常见设计：

```ts
class BadRequestError extends Error {}
class UnauthorizedError extends Error {}
class ForbiddenError extends Error {}
```

Route 层捕获后转成 status code。

Tutor 提醒：错误处理要清楚地区分“用户输入错了”和“服务器自己炸了”。这两者不能都变成 500。

## 44. Code Coverage：测试覆盖了多少代码

Code coverage 衡量：

```text
测试运行时，代码有多少被执行过。
```

常见 coverage 指标：

- statement coverage；
- branch coverage；
- function coverage；
- line coverage。

例如：

```ts
if (x > 0) {
  return 'positive';
} else {
  return 'non-positive';
}
```

如果测试只测 `x > 0`，line 可能覆盖了一部分，但 branch coverage 不完整。

Coverage 的价值：

- 找到没测试到的代码；
- 提醒你补 edge cases；
- 防止测试集中在 happy path。

Coverage 的局限：

```text
100% coverage 不等于没有 bug。
```

因为你可能执行了所有代码，但 assertion 写得很弱。

坏测试：

```ts
expect(result).toBeDefined();
```

这种就算 coverage 很高，也不太能证明逻辑正确。

好测试应该检查具体行为：

```ts
expect(result).toStrictEqual({ userId: 1 });
```

## 45. Auth：身份、token、权限

Auth 通常分两层：

```text
Authentication：你是谁？
Authorisation：你有没有权限做这件事？
```

Authentication 例子：

```text
用户 login，系统验证 email/password。
```

Authorisation 例子：

```text
这个用户是不是 channel owner？能不能 delete message？
```

### Token

登录成功后，server 通常返回 token。

之后 client 每次 request 都带 token：

```text
token -> server 查出 userId -> 知道是谁
```

Token 不应该只是 userId 明文随便传。

项目简化时可以用随机 session token：

```ts
{
  token: 'abc123',
  authUserId: 1
}
```

data 里保存 active sessions。

### Password

真实系统不能明文存密码，要 hash。

课程项目里如果没要求 hash，也至少要理解：

```text
plain password storage is insecure。
```

### 401 vs 403

很常考：

```text
401 Unauthorized：我不知道你是谁，token invalid/missing。
403 Forbidden：我知道你是谁，但你没权限。
```

### Logout

Logout 本质是让 token/session 失效。

常见做法：

```text
从 sessions 里删除这个 token。
```

## 46. Conceptual Modelling：先建模，再写代码

Conceptual modelling 是把问题领域里的概念和关系画清楚。

例如一个 messaging app：

- User；
- Channel；
- Message；
- Session；
- Permission；
- Notification。

关系：

```text
User creates Channel
User sends Message
Channel contains Messages
User joins Channel
```

为什么要建模？

因为如果你一开始 data model 错了，后面函数会越来越别扭。

例如：

```ts
const data = {
  users: [],
  channels: [],
  messages: [],
  sessions: [],
};
```

你要决定：

- message 存在 channel 里面，还是单独 messages array？
- channel 里存 user objects，还是 userIds？
- token 存在 user 里，还是 sessions array？
- owner/member 怎么表示？

好的 model 会让业务逻辑自然。

坏 model 会导致：

- duplication；
- inconsistent state；
- 很多地方要同步更新；
- 删除/修改很容易漏。

Tutor 提醒：data model 是项目的骨架。骨架歪了，后面每个功能都难受。

## 47. Design for Maintainability and Software Complexity

Maintainability 是：

```text
未来的人能不能安全、快速地理解和修改这份代码。
```

复杂度来源：

- functions 太长；
- nested if 太多；
- duplicated logic；
- unclear names；
- hidden side effects；
- global state 乱用；
- data model 混乱；
- strong coupling。

### Coupling and Cohesion

Coupling：

```text
模块之间依赖有多强。
```

低 coupling 比较好。一个模块改动不应该让所有模块都坏。

Cohesion：

```text
一个模块内部的功能是否围绕同一个责任。
```

高 cohesion 比较好。

例如：

- `auth.ts` 处理 auth；
- `channels.ts` 处理 channels；
- `dataStore.ts` 处理数据存取。

### DRY

DRY = Don't Repeat Yourself。

重复代码的问题：

```text
一个 bug 要修很多地方，很容易漏。
```

但也不要过度抽象。两段代码只是长得像，不一定语义相同。

### Naming

好名字比注释更重要。

坏名字：

```ts
function doThing(x: any) {}
```

好名字：

```ts
function getUserByToken(token: string): User {}
```

### Function size

如果一个 function 需要滚很久才能看完，它大概率做了太多事。

拆函数的标准不是“行数绝对多少”，而是：

```text
能不能一句话说清这个函数做什么？
```

## 48. Agile and Requirements Engineering

Requirements engineering 是搞清楚：

```text
我们到底要做什么，为什么做，给谁做，怎样算做对。
```

需求可以分：

- functional requirements：系统要做什么；
- non-functional requirements：系统质量，比如性能、安全、可用性、可靠性。

Agile 的核心是：

```text
不要假装一开始就知道所有答案。用短周期迭代、反馈和调整来开发。
```

常见 Agile 概念：

- sprint；
- backlog；
- user story；
- standup；
- retrospective；
- incremental delivery。

Agile 不是“不写计划”。它是：

```text
计划要短周期更新，持续响应变化。
```

### Standup

Standup 通常问：

```text
昨天做了什么？
今天准备做什么？
有什么 blocker？
```

重点不是汇报给老板，而是团队同步。

### Retrospective

Retro 问：

- 什么做得好？
- 什么做得不好？
- 下个 iteration 怎么改？

没有 retro，团队会重复同样的问题。

## 49. Use Cases and User Stories

User story 常见格式：

```text
As a <type of user>,
I want <some goal>,
so that <some reason>.
```

例子：

```text
As a user,
I want to reset my password,
so that I can regain access if I forget it.
```

好 user story 要从用户价值出发，而不是从技术任务出发。

坏 story：

```text
As a developer, I want to create a database table.
```

这不是用户价值。

### Acceptance criteria

Acceptance criteria 说明：

```text
怎样才算这个 story 完成。
```

例子：

```text
Given an existing account,
When the user enters a valid email,
Then a reset link is sent.
```

这就是 Given-When-Then 风格。

### Use case

Use case 更详细，描述 actor 和 system 的交互步骤。

包含：

- actor；
- preconditions；
- main success scenario；
- alternative flows；
- postconditions。

User story 更轻量；use case 更详细。

## 50. Validation：我们做的是用户真正需要的吗

Verification 和 validation 不一样。

Verification：

```text
Are we building the product right?
```

Validation：

```text
Are we building the right product?
```

也就是说：

- tests pass 是 verification；
- 用户真的需要这个功能，是 validation。

Validation 方法：

- stakeholder interview；
- prototype；
- user testing；
- feedback session；
- survey；
- observation；
- acceptance criteria review。

例子：

```text
你写了一个功能，测试全过，但用户说这个流程根本不好用。
```

这就是 verification 过了，validation 没过。

COMP1531 项目里，validation 体现在：

- 理解 spec；
- 和 tutor/teammates clarify；
- demo；
- iteration feedback；
- 根据反馈调整。

## 51. Deployment：让别人真的能访问你的系统

Deployment 是把软件从开发环境放到可运行环境。

开发时：

```text
localhost
```

部署后：

```text
真实 server / cloud / hosted URL
```

Deployment 需要考虑：

- environment variables；
- ports；
- dependencies；
- build step；
- start command；
- persistence；
- logs；
- security；
- scaling。

### Environment variables

不要把 secret 写死在代码里。

常见：

```text
PORT
DATABASE_URL
JWT_SECRET
```

在 Node 里：

```ts
process.env.PORT
```

### Build and start

TypeScript 项目可能需要：

```bash
npm install
npm run build
npm start
```

部署平台需要知道如何启动你的 server。

### Logs

部署后不能靠你盯着 terminal。

你要看 logs 来 debug：

- server crash；
- request error；
- failed auth；
- unexpected exception。

Tutor 提醒：能在你电脑上跑，不等于能部署。部署会暴露路径、环境、依赖、配置问题。

## 52. Thriving as a Team：怎么让团队项目少折磨一点

Guest lecture 的重点通常不是新技术，而是团队怎么活下来。

有效团队的特征：

- psychological safety；
- clear communication；
- shared standards；
- fast feedback；
- ownership；
- accountability；
- willingness to ask for help。

### Psychological safety

意思是：

```text
成员可以承认不知道、提出问题、指出风险，而不会被羞辱。
```

这很重要，因为软件项目里最危险的是：

```text
有人卡住了但不说，最后 deadline 前爆炸。
```

### Feedback

Code review 里的 feedback 应该针对代码，不针对人。

好的 feedback：

```text
这个函数现在同时处理 validation 和 mutation，能不能拆开？这样测试会更容易。
```

坏 feedback：

```text
你怎么写成这样？
```

### Conflict

Conflict 不一定坏。技术分歧可以提高质量。

关键是：

- 用 evidence；
- 回到 requirement；
- 小实验验证；
- 让 team agreement 决定流程。

## 53. Exam Briefing：1531 exam 通常怎么考

Exam briefing 不是让你背题，而是让你理解考试会怎样测能力。

COMP1531 exam 常见题型：

- 阅读代码，判断行为；
- 修 bug；
- 写/补 tests；
- HTTP route 和 request/response；
- Git/CI/process 概念；
- auth/error/status code；
- design/maintainability；
- requirements/user stories；
- teamwork/agile；
- deployment 概念。

复习时不要只背定义，要能回答：

```text
这个概念在项目里解决什么问题？
如果做错，会造成什么 bug？
我怎样用代码或流程体现它？
```

例如：

```text
CI 是什么？
```

低分答案：

```text
CI 是 continuous integration。
```

高分答案：

```text
CI 是在 push/MR 时自动运行 tests、lint、typecheck 的流程，用来防止坏代码进入 main，并让团队有一致的质量门槛。
```

再比如：

```text
Validation 和 verification 区别？
```

高分要能说：

```text
Verification 是确认系统是否按 spec 正确实现，Validation 是确认 spec/产品本身是否满足用户真实需求。
```

## 54. COMP1531 总能力图

你可以把整门课看成 5 条线：

### 1. Code line

```text
JavaScript/TypeScript
functions
modules
Express server
data store
persistence
exceptions
auth
```

这是“会写后端”的线。

### 2. Quality line

```text
unit tests
HTTP tests
coverage
static verification
linting
CI
code review
```

这是“写完以后怎么证明它可靠”的线。

### 3. Collaboration line

```text
Git
branches
merge requests
team contract
meetings
task decomposition
conflict resolution
```

这是“多人怎么不互相破坏”的线。

### 4. Product line

```text
requirements
user stories
use cases
validation
agile
stakeholder feedback
```

这是“我们做的东西是不是用户要的”的线。

### 5. Operations line

```text
package management
environment variables
deployment
logs
runtime configuration
```

这是“代码怎么变成真正能跑的服务”的线。

## 55. 1531 最容易混淆的概念

### Verification vs Validation

```text
Verification：做得对不对？
Validation：做的是不是对的东西？
```

### Authentication vs Authorisation

```text
Authentication：你是谁？
Authorisation：你有没有权限？
```

### Unit test vs HTTP test

```text
Unit test：直接测函数。
HTTP test：通过 API 测 server 行为。
```

### Static vs Dynamic verification

```text
Static：不运行代码，靠类型/lint/review。
Dynamic：运行代码，靠 tests。
```

### Dependencies vs devDependencies

```text
dependencies：运行时需要。
devDependencies：开发/测试/构建时需要。
```

### 401 vs 403

```text
401：token 不对，我不知道你是谁。
403：我知道你是谁，但你没权限。
```

### Branch vs MR

```text
Branch：独立开发线。
MR：把 branch 合并回 main 前的 review/CI/approval 流程。
```

## 56. 1531 期末/项目复习顺序

如果你现在要复习 1531，建议顺序：

1. JavaScript/TypeScript data structures；
2. functions、modules、imports；
3. Git solo + team workflow；
4. Jest tests；
5. Express HTTP server；
6. HTTP testing；
7. data store + persistence；
8. exceptions + status codes；
9. auth token + permissions；
10. lint/static verification/CI；
11. coverage；
12. maintainability/design；
13. requirements/user stories/use cases；
14. agile/teamwork；
15. deployment。

为什么这个顺序合理？

因为它对应你做 project 的真实顺序：

```text
先会写代码 -> 再会拆模块 -> 再会协作 -> 再会测试 -> 再接 HTTP -> 再处理真实工程问题。
```

## 57. Tutor 风格总提醒

COMP1531 不是一门“背软件工程名词”的课。

它真正想让你形成一种工程直觉：

```text
我写的代码别人能不能读？
我改的东西会不会破坏已有功能？
这个需求有没有被测试保护？
这个 API 从用户角度是不是清楚？
这个错误应该是什么 status code？
这个数据模型以后会不会很难维护？
这个团队流程能不能让大家及时发现问题？
```

如果你能这样想，你就已经从“写作业代码”往“做软件项目”走了一大步。

# COMP1531 Major Project 总结：Unigotchi 从需求到后端工程

## 58. Unigotchi 项目总览：这不是小游戏，是软件工程训练场

Unigotchi 表面上是一个大学生活模拟游戏：

```text
学生有 energy、happiness、academic progress。
玩家通过 study、sleep、eat、exercise、doom scroll 等 action 推进 simulation。
目标是让学生毕业，而不是因为挂科、没精力、没快乐而 drop out。
```

但从 COMP1531 的角度看，它真正训练的是：

```text
需求理解 -> 数据建模 -> 函数接口 -> 黑盒测试 -> HTTP API -> session/auth -> persistence -> CI -> 团队协作
```

也就是说，project 不是单纯“把功能写出来”，而是把整门课的知识放进一个真实软件工程流程里。

可以这样理解：

```text
Iteration 0：先搭项目骨架，写 stubs，想清楚数据结构。
Iteration 1：实现核心业务逻辑，用 Jest 黑盒测试保护行为。
Iteration 2：把函数系统升级成 TypeScript HTTP backend，并接入 sessions、persistence、安全和 frontend。
```

所以复习 project 时，不要只背每个函数返回什么。更重要的是理解：

```text
为什么要有 data model？
为什么测试不能直接摸 dataStore？
为什么 userId 到了 HTTP 阶段不够？
为什么错误要变成 exceptions？
为什么 persistence、hashing、random session ID 是工程质量的一部分？
```

## 59. Iteration 0：先把“项目样子”搭出来

Iteration 0 的重点不是实现逻辑，而是证明你们开始像一个工程团队那样工作。

它要求你做几类事情：

```text
1. group contract
2. meeting minutes
3. GitLab issue board
4. branch / merge request workflow
5. data.md 里的数据结构设计
6. 所有接口函数的 stubs
```

stub 的意思是：

```text
函数名字、参数、返回类型都对；
但里面还没有真正实现。
```

比如 auth、user、simulation、exam、course、other 这些文件按函数名前缀拆开：

```text
auth.js        -> authRegister, authLogin
user.js        -> userDetails, userDetailsUpdate
simulation.js  -> simulationCreate, simulationList, simulationStatus, simulate...
exam.js        -> examTake, examList, examDetails
course.js      -> courseList, courseDetails
other.js       -> clear
```

这里对应 Week 1-3 的知识点：

```text
multi-file structure
module import/export
interface-driven development
Git branching
merge requests
team contracts
issue tracking
```

Tutor 想看的不是你“会不会写 return {}`”，而是：

```text
你们有没有先理解系统需要存什么？
有没有把任务拆成 issue？
有没有通过 MR 协作？
有没有避免每个人在 master 上乱改？
```

## 60. Iteration 1：核心逻辑阶段

Iteration 1 才开始真正实现 Unigotchi 的核心 backend logic。

这一阶段有一个非常重要的限制：

```text
不要写 web server。
不要写 HTTP route。
只实现 CLI 会调用的普通 JavaScript functions。
```

也就是说，此时你的系统大概是：

```text
test files -> call exported functions -> functions read/write dataStore -> return object or error object
```

Iteration 1 的核心训练点是：

```text
1. 用 dataStore 维护应用状态
2. 根据 spec 实现函数行为
3. 用 Jest 写黑盒测试
4. 正确处理 error type
5. 让 simulation mechanics 不被写死
```

这里最容易犯的错是：

```text
只为了 dryrun 写 hard-code。
```

但 spec 明确说 universeData 会变化，automarker 会用不同配置。所以你必须写成 general logic：

```text
course/exam 从 universeData 读；
study hours 按 examId 更新；
course status 按该 course 的 3 个 exams 推导；
graduation/dropout 按所有 courses/exams/stats 推导。
```

## 61. Universe Configuration：项目的数据建模核心

Universe 是一个 simulation 的“学术世界配置”。

它包含：

```text
courses: 1 到 6 门课
exams: 每门课正好 3 个 exam
```

每个 course 大概有：

```text
courseId: 4 个大写字母 + 4 个数字，例如 COMP1531
name: 2 到 40 个字符
```

每个 exam 大概有：

```text
examId: 2 到 20 个字符
courseId: 必须对应一个存在的 course
name: 2 到 40 个字符
requiredStudyHours: positive integer
```

这部分对应课程里的 data modelling 和 validation。

你要分清两件事：

```text
schema validation：这个 universeData 长得合不合法？
simulation state：创建 simulation 之后，每个 exam/course 当前状态是什么？
```

比如 universeData 只是配置：

```text
这门课叫什么？
有哪些 exam？
每个 exam 要学多久？
```

而 simulation state 是运行时状态：

```text
这个用户有没有学过这个 exam？
这个 exam 有没有考过？
这个 course 是 IN_PROGRESS、PASSED 还是 FAILED？
这个 simulation 是否 ACTIVE？
```

很多 bug 来自把这两层混在一起。

更好的 mental model 是：

```text
universeData 是模板；
simulation 是模板的一份独立运行副本。
```

## 62. Simulation Mechanics：状态变化是 project 的灵魂

新 simulation 的初始状态是：

```text
simulationStatus: ACTIVE
currentActivity: DOOM_SCROLLING
energy: 100
happiness: 50
timeElapsed: 0
每个 exam 的 studyHoursCompleted: 0
```

energy 和 happiness 都必须 clamp 到 0-100：

```text
低于 0 -> 变 0
高于 100 -> 变 100
```

duration 必须是：

```text
integer
>= 1
```

否则是 `INVALID_DURATION`。

各活动效果：

```text
DOOM_SCROLLING: energy +3/hr, happiness +2/hr
SLEEPING:       energy +15/hr, happiness +2/hr
EATING:         energy +10/hr, happiness +3/hr
EXERCISING:     energy -10/hr, happiness +6/hr
STUDYING:       energy -15/hr, happiness -5/hr, target exam study +1/hr
```

这里考的不是数学，而是 state transition：

```text
action 发生前，先检查是否合法；
action 合法后，推进 timeElapsed；
更新 energy/happiness/studyHours；
更新 currentActivity；
检查 course status；
检查 graduation/dropout。
```

特别注意 constraints：

```text
STUDYING：最多连续 3 小时，然后必须做别的 activity 至少 1 小时。
EXERCISING：需要最近 4 小时内吃过东西，并且上次 exercise 结束后有 1 小时 cooldown。
```

spec 还强调：

```text
这些时间窗口按 activity 结束时间算，不是开始时间。
```

所以你需要记录 action history 或足够的摘要状态，否则很难判断“最近几小时发生过什么”。

## 63. Course、Exam、Win/Lose：从局部结果推导整体状态

examTake 的逻辑在 Iteration 1 里相对直接：

```text
studyHoursCompleted >= requiredStudyHours -> PASS
否则 -> FAIL
```

examTake 不推进时间，也不改变 currentActivity，但会影响：

```text
exam attempted / passed
course status
simulation status
```

course status 的规则：

```text
IN_PROGRESS：初始状态
PASSED：3 个 exams 中至少 2 个 pass，并且该 course 所有 exams 都 attempted
FAILED：3 个 exams 中至少 2 个 fail
```

simulation status 的规则：

```text
GRADUATED：
所有 courses 都 PASSED，并且 energy > 0，happiness > 0

DROPPED_OUT：
任意 course FAILED
或总 exam failures 达到 5
或 energy == 0
或 happiness == 0
```

这正好对应 conceptual modelling 里的：

```text
entity state
derived state
invariant
state machine
```

重点是：不要到处手动改状态，最好让状态更新逻辑有清晰入口。

否则很容易出现：

```text
exam 已经 fail 了，但 course 还显示 IN_PROGRESS
所有 courses passed 了，但 simulation 还没 GRADUATED
energy 到 0 了，但还能继续 action
```

## 64. Iteration 1 Interface：函数不是随便写，是 contract

Project 的 interface 就是 contract。

每个函数的参数、返回 object、error type 都是外部系统依赖的东西。

比如：

```text
authRegister -> { userId }
simulationCreate -> { simulationId }
simulationList -> { simulations: [...] }
simulationStatus -> stats object
examList -> { exams: [...] }
courseList -> { courses: [...] }
clear -> {}
```

这里要养成一个习惯：

```text
返回值 shape 比变量名更重要。
```

CLI、tests、automarker 不关心你内部怎么存，只关心：

```text
调用这个函数后，返回 object 是否符合 spec？
下一次调用时，状态是否符合 spec？
出错时，error type 是否符合 spec？
```

这就是 interface-driven programming。

## 65. Testing Strategy：黑盒测试才是 marked tests 的重点

Iteration 1 的测试必须是 black-box tests。

意思是：

```text
测试只能通过公开函数观察系统行为；
不能 import dataStore 直接看内部数据。
```

正确测试方式：

```text
authRegister(...)
simulationCreate(...)
simulateStudy(...)
examDetails(...)
expect returned object / side effect
```

错误测试方式：

```text
直接读 data.users
直接读 data.simulations
依赖你自己内部数组顺序或私有字段名
```

为什么？

因为 marked tests 应该能套到任何 faithful implementation 上。

如果另一个组内部用 Map，你用 array，只要 interface 行为一样，测试就应该一样 pass。

测试还要注意：

```text
每个 test 前 clear()
不要检查具体 error message
只检查 error type
不要测试 undefined behaviour
test name 要说清楚行为
```

Acceptance Criteria 很适合变成 tests：

```text
Given valid inputs, returns expected object.
Given duplicate studentId, returns INVALID_STUDENT_ID.
Given invalid duration, returns INVALID_DURATION.
Given enough study hours, examTake returns PASS.
Given 2 failed exams in a course, course becomes FAILED and simulation DROPPED_OUT.
```

这就是从 requirements 到 verification 的桥。

## 66. Iteration 2：从普通函数升级成 HTTP backend

Iteration 2 的本质是：

```text
把 Iteration 1 的 core logic 包到 Express HTTP API 后面。
```

系统结构变成：

```text
frontend / HTTP tests
        ↓
Express server routes
        ↓
auth/session/error middleware-ish handling
        ↓
core functions / data store
        ↓
persistence file
```

这时你会遇到 Week 5-9 的知识点：

```text
HTTP methods
route parameters
query parameters
request body
status codes
JSON response
sessions
TypeScript
linting
coverage
CI
persistence
exceptions
security
```

一个重要转换是：

```text
Iteration 1：function returns { error, message }
Iteration 2：core function throws UnigotchiError，HTTP layer catches and sends status code + JSON body
```

这样做的原因是 separation of concerns：

```text
业务逻辑只关心“发生了什么错误”；
HTTP 层负责“这个错误应该变成 400、401 还是 403”。
```

## 67. HTTP API：route 是 frontend 和 backend 的合同

Iteration 2 要跟 `swagger.yaml` 对齐。

你要非常清楚不同 HTTP method 一般怎么传数据：

```text
GET / DELETE：多用 query parameters 或 route params
POST / PUT：多用 JSON body
session：放 header，不放 URL
```

例如：

```text
POST /auth/register
POST /auth/login
GET /user
PUT /user
POST /v1/simulations
POST /v2/simulations
GET /simulations
GET /simulations/{simulationId}
POST /simulations/{simulationId}/action
DELETE /clear
```

Route ordering 也重要：

```text
具体 route 要放在 wildcard route 前面。
```

例如：

```text
/universes/list
```

如果放在：

```text
/universes/{name}
```

后面，Express 可能会把 `list` 当成 `name`。

这对应 HTTP server 那一讲里的重点：

```text
Express 是 top-down matching。
```

## 68. Sessions/Auth：为什么 Iteration 1 的 userId 不够

Iteration 1 用 userId 很简单：

```text
函数参数里传 userId。
```

但到 HTTP 系统里，这不安全也不真实。

问题是：

```text
如果 userId 是 1、2、3，别人可以猜。
userId 不能表示“当前登录状态”。
用户无法真正 logout 某个登录设备。
```

所以 Iteration 2 引入 session：

```text
login/register 后返回 session
之后请求把 session 放在 header
server 用 session 找到对应 user
logout 可以删除该 session
```

session 应该是：

```text
random
unpredictable
not exposed in URL
```

这对应 auth 那一讲：

```text
authentication：你是谁？
authorization：你有没有权限访问这个 simulation？
```

常见错误：

```text
401：没有合法登录 session
403：登录了，但访问不属于自己的 resource
400：输入本身不合法
```

spec 还要求错误优先级：

```text
先 401，再 403，再 400。
同一 status code 内按 swagger 里列出的顺序。
```

## 69. Iteration 2 新功能：friends、clubs、pass chance

Iteration 2 不是只做 HTTP wrapper，还加了新的 simulation mechanics。

Friends 和 SOCIALISING：

```text
SOCIALISING:
energy -10/hr
happiness +10/hr + 3 * friend count per hour
constraint:
  最近 6 小时内睡过 1 小时
  至少有 1 个 friend
```

Clubs 和 CLUB_PARTICIPATION：

```text
最多加入 3 个 clubs
每个 club 有 happinessBonus 和 academicBonus
CLUB_PARTICIPATION:
energy -30/hr
happiness 增加 joined clubs 的 happinessBonus 总和
所有 exams 的 pass chance 增加 joined clubs 的 academicBonus 总和
```

Exams 也变复杂：

```text
每个 exam 有 passChance，初始 0，范围 0-100。
studying 某个 exam：该 exam passChance +1/hr。
club participation：所有 exams passChance 增加。
exam outcome 必须用提供的 deterministic evaluateExam helper。
```

这里的工程重点是：

```text
新增功能不能破坏旧功能。
```

所以你需要：

```text
旧 Iteration 1 tests 继续保护核心 simulation；
新 HTTP tests 覆盖 friends/clubs/action endpoint；
TypeScript 帮你检查数据 shape；
CI 帮你防止 failing code 被 merge。
```

## 70. Persistence、Hashing、Exceptions：从作业代码到后端工程

Iteration 2 的 code quality 明确要求三个真实后端能力。

第一是 persistence：

```text
server restart 后，users、sessions、simulations、universes 等状态还在。
```

这通常意味着：

```text
启动时 load persisted data；
状态变化后 save data；
clear 时也清 persistence。
```

第二是 password hashing：

```text
不能明文存 password。
```

用户注册时应存 hash，登录时比较 password 和 hash。

这对应 security 的基本原则：

```text
即使 data file 泄露，也不应该直接泄露用户密码。
```

第三是 exceptions：

```text
core logic throw UnigotchiError(errorType, message)
server catch error
server 转成 HTTP status + { error, message }
```

这让代码更干净：

```text
业务层不需要知道 res.status(400)
HTTP 层不需要知道 simulation 怎么计算
```

## 71. Activity State Machine：统一 action endpoint 的意义

Iteration 1 里有很多 action functions：

```text
simulateDoomScroll
simulateSleep
simulateEat
simulateStudy
simulateExercise
```

Iteration 2 用统一 endpoint：

```text
POST /simulations/{simulationId}/action
```

action body 里告诉 server：

```text
action: STUDYING / SLEEPING / EATING / ...
duration
targetId if needed
```

这体现了 API design 的一个思想：

```text
前端不需要知道后端有几个内部函数；
前端只需要知道“我要对 simulation 做一个 action”。
```

所有 activity 可以互相切换，但受 constraints 限制：

```text
duration 必须合法
study 不能超过连续限制
exercise/socialise/club participation 各自有前置条件
simulation 必须 ACTIVE
targetId 必须存在且适用于该 action
```

这就是 state machine：

```text
当前状态 + action + constraints -> 下一个状态
```

## 72. Frontend Integration、Dryrun、Preview：验证不是只跑一次 test

Iteration 2 最后需要演示 supplied frontend 连上 backend。

这说明 backend 不只是给 automarker 用，还要能被真实 client 使用。

你需要关注：

```text
server 是否读 config.json 的 port/host
routes 是否和 swagger.yaml 一致
session header 是否被正确处理
frontend 登录后是否能创建 simulation
action 后页面状态是否更新
错误时 response 是否前端能理解
```

验证层次可以这样排：

```text
1. unit/core tests：核心函数行为
2. HTTP tests：route/status/body/side effect
3. lint：style 和潜在错误
4. TypeScript：类型合规
5. coverage：测试覆盖率
6. dryrun：基础接口格式 sanity check
7. frontend demo：真实用户路径
8. preview/automarker：隐藏测试反馈
```

Dryrun 的作用只是 sanity check：

```text
能过 dryrun 不等于实现正确。
```

Preview/automarker 更接近最终隐藏测试，但也不会告诉你哪里错，所以还是要靠自己的测试覆盖边界情况。

## 73. Teamwork 和 Git：project 分数不是只看代码能不能跑

COMP1531 project 很强调 process。

你需要持续证明：

```text
issue board 有 task
每个 task 有 acceptance criteria
task 有 assignee、due date、iteration label/milestone
MR link 到 issue
MR 被非作者 review
不要直接 push master
不要 merge failing tests
每周有 meeting / standup evidence
有 reflection 和 teamwork evaluation
```

这不是形式主义。它对应真实软件团队的问题：

```text
谁负责这个功能？
做到什么算 done？
怎么知道它没有破坏别的功能？
谁 review 过？
出了问题能不能追溯？
```

Git 方面要记住：

```text
master 上应该只放 working code。
如果 branch 功能没测完，不要为了“看起来完成”硬 merge。
```

分支命名可以像：

```text
iter1-feat-simulation-create
iter1-test-exam-taking
iter2-fix-session-auth
iter2-feat-club-participation
```

commit message 要 meaningful，不要一直写：

```text
update
fix
changes
final
```

## 74. Project 和课程知识点的对应关系

可以把 Unigotchi 当作整门课的地图：

```text
stubs/interface              -> JavaScript functions, modules, contracts
dataStore                    -> state management, data modelling
universe validation          -> input validation, schema thinking
simulation mechanics         -> state machine, invariants, derived state
Jest tests                   -> dynamic verification
black-box testing            -> testing through public interface
clear beforeEach             -> test independence
coverage                     -> test adequacy signal
lint                         -> static/style verification
TypeScript                   -> static type checking
Express routes               -> HTTP server
HTTP tests                   -> integration testing
swagger.yaml                 -> API specification
sessions                     -> authentication
resource ownership checks    -> authorization
UnigotchiError               -> exception-based error handling
persistence                  -> durable backend state
password hashing             -> security
frontend demo                -> client/server integration
GitLab issues/MRs            -> agile teamwork
CI                           -> automated verification
reflection                   -> process improvement
```

如果考试或 demo 里 tutor 问：

```text
“这个 project 和课程有什么关系？”
```

你可以回答：

```text
它把一个后端系统从 interface specification 做到 tested HTTP API。
Iteration 0 练项目初始化和团队流程；
Iteration 1 练 core logic、data modelling 和 black-box tests；
Iteration 2 练 Express API、sessions、persistence、security、exceptions、TypeScript、CI 和 frontend integration。
```

## 75. 最容易翻车的点

Project 常见翻车点：

```text
1. hard-code sample universe，而不是支持任意 valid universe。
2. tests 直接 import dataStore，违反 black-box testing。
3. 每个 test 前不 clear，导致测试互相污染。
4. 只测 happy path，不测 invalid duration、invalid exam、ownership、dropout 等。
5. course status 和 simulation status 没有同步更新。
6. action constraints 用开始时间算，而不是结束时间算。
7. Iteration 2 还在用 userId 当 authentication。
8. session 放 URL 里，而不是 header。
9. password 明文存储。
10. core logic 到处 res.status，业务层和 HTTP 层混在一起。
11. route 顺序错，wildcard 抢走具体 route。
12. persistence 只 save 不 load，或 clear 后旧文件还在。
13. TypeScript 类型靠 any 糊过去，最后 tsc/lint 掉分。
14. dryrun 过了就以为万事大吉。
15. merge failing or untested branches into master。
```

一句话总结：

```text
Unigotchi 最难的不是单个函数，而是“状态一致性 + 接口一致性 + 测试保护 + 团队流程”。
```

## 76. Project Survival Checklist：写完前按这个检查

Iteration 1 前检查：

```text
auth/user/simulation/exam/course/clear 所有函数都有实现。
所有函数返回 shape 和 spec 一致。
所有 error type 和优先级按 interface。
universeData validation 覆盖 schema、course 数量、exam 数量、ID 格式。
simulation 初始状态正确。
每个 action 正确更新 time、energy、happiness、currentActivity。
stats clamp 到 0-100。
study/exercise constraints 正确。
exam/course/simulation status 会在 action/examTake 后更新。
tests 是 black-box。
每个 test 前 clear。
```

Iteration 2 前检查：

```text
server routes 和 swagger.yaml 一致。
GET/DELETE 用 query/params，POST/PUT 用 body。
session 通过 header 传。
401/403/400 区分正确。
core logic throw UnigotchiError。
server catch exceptions 并返回 { error, message }。
password hashed。
session ID random or obfuscated。
persistence 能 save/load/clear。
friends/socialising 实现并测试。
clubs/club participation/pass chance 实现并测试。
统一 action endpoint 正确分发所有 activity。
npm run lint 通过。
npm run tsc 通过。
tests 和 coverage 达标。
frontend 能跑通 register/login/create simulation/action/status。
```

团队流程检查：

```text
issue 有 acceptance criteria。
issue 有 assignee、due date、iteration label/milestone。
MR link issue。
MR 被别人 review。
master 只 merge passing code。
meeting minutes 和 standup evidence 留痕。
reflection/teamwork evaluation 按时完成。
```

## 77. Tutor 风格总结：这个 project 想培养什么

COMP1531 Major Project 想让你从这件事里毕业：

```text
“我会写一个函数。”
```

进入这件事：

```text
“我能和一个团队，根据需求规格，设计数据模型，实现后端接口，写测试保护行为，用 HTTP 暴露服务，处理 auth/security/persistence，并用工程流程持续交付。”
```

所以复习时可以抓住四条主线：

```text
需求线：spec -> acceptance criteria -> tests
数据线：universe -> simulation -> exams/courses/users/sessions
行为线：action -> state transition -> status update -> win/lose
工程线：Git/MR -> CI -> lint/tsc/tests -> frontend demo
```

如果你能把这四条线讲清楚，Unigotchi 这个 project 基本就被你吃透了。
