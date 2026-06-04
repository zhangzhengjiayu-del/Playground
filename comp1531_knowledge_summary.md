# COMP1531 知识点总览

来源：桌面 `comp1531` 文件夹内的 27 份 lecture slides PDF。

COMP1531 的核心不是底层机器，而是软件工程实践。课程主线可以概括为：

> 如何用团队协作、版本控制、测试、HTTP API、持续集成和良好设计，把一个可维护的软件系统做出来。

## 1. Course Overview

这一部分介绍课程结构和学习目标。

需要掌握：

- 课程围绕软件工程基础展开。
- 主要学习方式包括 lecture、tutorial、lab、quiz、group project 和 final exam。
- 大项目是课程核心，通常以小组形式完成。
- 课程使用的关键工具包括 GitLab、Discourse、Teams、git、Node.js。

重点理解：

- COMP1531 不只是写代码，而是模拟真实软件开发流程。
- 最终目标是能在团队中开发、测试、维护和交付一个后端系统。

## 2. Software Engineering

这一部分讲什么是软件工程，以及它和计算机科学的区别。

需要掌握：

- Computer Science 更关注计算机如何工作、能做什么、效率如何。
- Software Engineering 更关注为真实用户构建可维护、可扩展、安全的软件。
- 软件工程不只看功能是否能跑，还看长期维护、协作、质量和风险。

重点理解：

- 学生小作业通常“交完就结束”，工业软件需要长期维护。
- 软件可能服务大量用户，因此 bug、性能、安全和可维护性都会变得重要。
- 协作是软件工程和个人编程的重要区别。

## 3. JavaScript / TypeScript 基础

slides 中有 JavaScript 内容，课程项目通常围绕 Node.js 后端开发。

需要掌握：

- JavaScript/TypeScript 的基本语法：变量、函数、条件、循环、数组、对象。
- `let`、`const` 的使用。
- object 和 array 是后端数据建模的基础。
- 函数可以作为值传递。
- TypeScript 在 JavaScript 基础上加入静态类型，能提前发现很多错误。

重点理解：

- 后端项目的核心通常是处理 request，读写数据，然后返回 response。
- TypeScript 类型不是运行时保证，而是开发阶段的静态检查工具。
- 写清楚 interface/type 可以让团队协作更安全。

## 4. Git Solo Usage

这一部分讲个人使用 Git。

需要掌握：

- repository、commit、branch、working tree、staging area。
- 常用命令：
  - `git status`
  - `git add`
  - `git commit`
  - `git log`
  - `git diff`
  - `git push`
  - `git pull`
- commit 应该小而清晰，表达一个完整意图。

重点理解：

- Git 记录的是项目历史，不只是备份文件。
- `add` 是选择要进入下一次 commit 的内容。
- 好的 commit 习惯能让 debugging 和 code review 更容易。

## 5. Git Team Usage

这一部分讲团队协作中的 Git。

需要掌握：

- branch-based workflow。
- merge request / pull request。
- code review。
- merge conflict 的产生原因和解决方式。
- 避免多人长期在同一分支堆积大量改动。

重点理解：

- 团队开发中，Git 是协调工具，不只是提交工具。
- 频繁同步、清晰分支、及时 review 可以减少冲突。
- merge conflict 不是错误，而是 Git 无法自动判断哪份改动应该保留。

## 6. Teamwork

这一部分讲团队合作。

需要掌握：

- 团队需要明确沟通渠道、会议节奏、任务分配和责任边界。
- good teamwork 包括透明进度、及时求助、互相 review、共享知识。
- bad teamwork 常见表现包括沉默、拖延、任务不清、单人承担过多工作。
- 大项目评分通常会考虑个人贡献和团队协作。

重点理解：

- 团队项目失败往往不是因为技术完全不会，而是沟通和流程失控。
- 工程团队需要把任务拆小，并持续集成。
- 遇到组员问题要尽早沟通，而不是等 deadline 前爆炸。

## 7. Multi-file & Importing

这一部分讲如何把代码拆成多个文件。

需要掌握：

- 一个项目不应该把所有逻辑都写在一个文件里。
- module/import/export 的作用。
- 拆分代码时要按职责组织，而不是随意拆。
- 公共函数、数据类型、路由、测试可以分别放在不同文件。

重点理解：

- 多文件结构能提升可读性和可维护性。
- 文件之间依赖太乱会导致修改困难。
- 好的模块边界应该让每个文件有清楚职责。

## 8. Package Management

这一部分讲包管理。

需要掌握：

- Node.js 项目通常用 `package.json` 描述依赖和脚本。
- npm/yarn/pnpm 用来安装和管理 package。
- dependencies 和 devDependencies 的区别。
- lockfile 用来固定依赖版本，保证团队环境一致。
- scripts 可以封装常用命令，例如 test、lint、start。

重点理解：

- 不要随意加依赖；依赖会带来维护、安全和版本风险。
- lockfile 对团队项目很重要。
- 项目能否稳定安装和运行，是软件工程质量的一部分。

## 9. Dynamic Verification

这一部分讲动态验证，也就是运行代码和测试来确认行为正确。

需要掌握：

- testing 的目的不是证明程序绝对无 bug，而是提高对行为的信心。
- unit test 测单个函数或模块。
- integration test 测多个部分一起工作。
- black-box testing 根据输入输出测试，不关心内部实现。
- white-box testing 会考虑内部路径和结构。
- edge cases 很重要，例如空输入、非法输入、边界值。

重点理解：

- 测试应该来自 specification，而不是只测自己实现时想到的 happy path。
- 好测试能帮助重构，因为它能锁住期望行为。
- 测试失败时要先理解失败暴露的行为问题，而不是只为了让测试变绿。

## 10. Continuous Integration

这一部分讲 CI。

需要掌握：

- CI 是在代码提交/合并时自动运行检查。
- 常见 CI 检查包括 tests、lint、typecheck、build。
- GitLab CI 通常通过配置文件定义 pipeline。
- CI 让团队更早发现问题，避免坏代码进入主分支。

重点理解：

- CI 不是替代本地测试，而是团队共享的质量闸门。
- 如果 CI 红了，应该优先修复。
- pipeline 失败通常说明项目在某个可重复环境中不能通过验证。

## 11. Static Verification

这一部分讲静态验证，也就是不运行程序就检查代码。

需要掌握：

- TypeScript 类型检查。
- 编译器/类型系统能提前发现类型不匹配、字段不存在、返回值错误等问题。
- 静态分析可以发现一部分潜在 bug。

重点理解：

- 静态验证和动态测试互补。
- 类型越清晰，团队越容易安全修改代码。
- 但类型检查不能证明业务逻辑一定正确。

## 12. Linting

这一部分讲 lint。

需要掌握：

- linter 用来检查代码风格和一些可疑模式。
- 常见问题包括未使用变量、格式不一致、复杂表达式、危险写法。
- 团队项目应该统一 lint 规则。

重点理解：

- lint 的价值是减少无意义风格争论，让代码更一致。
- 自动化格式和 lint 可以降低 code review 成本。
- lint 通过不代表逻辑正确，但 lint 失败说明代码质量闸门没过。

## 13. HTTP Servers

这一部分讲 HTTP 后端服务器。

需要掌握：

- client-server 模型。
- HTTP request 和 response。
- method：`GET`、`POST`、`PUT`、`DELETE` 等。
- URL path、query parameters、body、headers。
- status code：例如 200、400、401、403、404、500。
- Express 这类框架如何定义 route handler。
- API endpoint 的设计。

重点理解：

- 后端 server 接收请求，执行业务逻辑，返回响应。
- API 是前端/测试/其他服务与后端交互的合同。
- 状态码应该表达请求结果，不能所有情况都返回 200。
- 输入验证和错误处理是 API 设计的一部分。

## 14. HTTP Testing

这一部分讲如何测试 HTTP API。

需要掌握：

- 对 endpoint 发请求并检查 response。
- 测试 method、path、body、query、headers、status code 和返回 JSON。
- 区分直接测函数和通过 HTTP 层测系统。
- 清理测试状态，避免测试互相污染。

重点理解：

- HTTP test 更接近真实用户/客户端使用方式。
- API 测试应该覆盖成功路径和失败路径。
- 如果后端依赖持久化数据，测试前后要控制数据状态。

## 15. Advanced Functions

这一部分讲更高级的函数概念。

需要掌握：

- 函数作为值。
- callback。
- higher-order function。
- map/filter/reduce 一类函数式工具。
- closure 的基本概念。

重点理解：

- 高阶函数可以减少重复逻辑。
- callback 在异步、事件处理、数组处理和测试中很常见。
- 过度抽象会降低可读性，所以要根据场景使用。

## 16. Persistence

这一部分讲持久化。

需要掌握：

- 程序内存中的数据在进程结束后会消失。
- persistence 用来把状态保存到文件或数据库中。
- JSON 文件常用于课程项目中的简单持久化。
- 读写持久化数据时要考虑初始化、保存时机和错误处理。

重点理解：

- 后端服务通常需要保存用户、消息、会话等状态。
- 内存数据和磁盘数据可能不同步。
- 测试时要避免真实持久化数据污染测试结果。

## 17. Exceptions

这一部分讲异常和错误处理。

需要掌握：

- exception 用来表示程序执行中的异常情况。
- `throw` / `try` / `catch`。
- 区分 programmer error、user/input error 和 system error。
- API 中错误通常要转化成合适 HTTP status code 和 response。

重点理解：

- 错误处理是接口合同的一部分。
- 不应该把所有错误都吞掉，也不应该把内部错误细节暴露给用户。
- 明确的错误类型和错误信息有助于测试和维护。

## 18. Code Coverage

这一部分讲测试覆盖率。

需要掌握：

- coverage 衡量测试执行到了多少代码。
- 常见指标包括 statement、branch、function、line coverage。
- 高 coverage 不等于测试质量一定高。
- 低 coverage 说明有大量代码没有被测试执行过。

重点理解：

- coverage 是发现测试盲区的工具，不是最终目标。
- branch coverage 对条件逻辑尤其重要。
- 好测试要同时考虑覆盖率和断言质量。

## 19. Auth

这一部分讲认证与授权。

需要掌握：

- authentication：确认“你是谁”。
- authorization：确认“你能做什么”。
- 用户注册、登录、登出。
- token/session 的基本思想。
- 受保护 endpoint 需要检查用户身份。
- 权限错误通常对应 401 或 403。

重点理解：

- 不同用户的数据不能混淆。
- token 是客户端证明身份的一种方式。
- 安全相关逻辑要小心测试失败路径，例如未登录、token 无效、权限不足。

## 20. Conceptual Modelling

这一部分讲概念建模。

需要掌握：

- 从需求中识别实体、属性和关系。
- 用模型帮助团队理解系统。
- 例如用户、频道、消息、权限、会话等都可以作为概念对象。

重点理解：

- 好的数据模型能让后续实现更简单。
- 模型不是数据库表的机械翻译，而是对问题领域的抽象。
- 如果概念边界错了，代码会变得难维护。

## 21. Design for Maintainability and Software Complexity

这一部分讲可维护性和复杂度。

需要掌握：

- maintainability：代码未来能否容易理解、修改、测试和扩展。
- 软件复杂度来源：重复逻辑、长函数、强耦合、隐藏状态、不清楚命名。
- 常见设计原则：
  - 单一职责。
  - 降低耦合。
  - 提高内聚。
  - 避免重复。
  - 清晰接口。
- 重构 refactoring：在不改变外部行为的情况下改善内部结构。

重点理解：

- 能跑的代码不一定是好代码。
- 团队项目越大，维护成本越重要。
- 测试是重构的安全网。

## 22. Agile and Requirements Engineering

这一部分讲敏捷开发和需求工程。

需要掌握：

- agile 强调迭代、反馈、适应变化。
- sprint、stand-up、backlog、retrospective 等概念。
- requirements engineering 关注理解用户真正需要什么。
- functional requirements 和 non-functional requirements。

重点理解：

- 需求不是一开始就完全清楚，真实项目需要不断澄清。
- 敏捷不是“没有计划”，而是短周期计划和反馈。
- 团队需要把大目标拆成可以执行和验证的小任务。

## 23. Use Cases and User Stories

这一部分讲用例和用户故事。

需要掌握：

- use case 描述用户与系统交互完成某个目标。
- user story 常见格式：
  - As a ...
  - I want ...
  - So that ...
- acceptance criteria 用来定义什么时候算完成。
- 需求要能转化成测试和实现任务。

重点理解：

- user story 关注用户价值，而不是一上来描述技术实现。
- acceptance criteria 越清楚，开发和测试越不容易跑偏。
- 好需求能减少团队误解。

## 24. Validation

这一部分讲 validation。

需要掌握：

- verification：我们是否正确地构建了系统。
- validation：我们构建的是否是正确的系统。
- 输入 validation：检查用户输入是否符合规则。
- 需求 validation：确认系统是否满足用户/业务目标。

重点理解：

- 通过测试不一定说明产品满足真实需求。
- API 必须防御非法输入。
- validation 常和错误处理、状态码、用户体验相关。

## 25. Deployment

这一部分讲部署。

需要掌握：

- deployment 是把软件运行到目标环境中，让用户/客户端可以访问。
- 本地环境和生产环境可能不同。
- 环境变量、配置、端口、依赖、构建步骤都可能影响部署。
- CI/CD 可以自动化测试和部署流程。

重点理解：

- “在我电脑上能跑”不等于部署环境能跑。
- 部署需要可重复、可追踪、可回滚。
- 日志和错误信息对部署后诊断很重要。

## 26. Thriving as a Team

这一部分来自 guest lecture，重点是如何让团队健康运转。

需要掌握：

- 主动沟通。
- 明确期望。
- 及时暴露风险。
- 尊重不同工作习惯。
- 冲突要尽早处理。
- 团队不是平均分工那么简单，而是共同承担交付结果。

重点理解：

- 技术能力和协作能力都影响项目结果。
- 好团队会让问题早出现、早解决。
- 不要让关键知识只在一个人脑子里。

## 27. Exam Briefing

这一部分讲考试形式和复习范围。

需要掌握：

- final exam 会覆盖 lectures、tutorials、labs 和 major project 相关内容。
- 需要理解概念，也需要能读写和推理代码。
- 课程强调实际工程判断，不只是背定义。

重点理解：

- 复习时不能只背 slide，要能解释“为什么这样做”。
- 常见考查方向包括 testing、Git、HTTP、auth、设计、团队流程、需求和错误处理。

## 课程整体能力图

COMP1531 最后希望你具备这些能力：

- 能用 TypeScript/Node.js 写后端逻辑。
- 能设计和实现 HTTP API。
- 能为函数和 endpoint 写测试。
- 能用 Git 在团队中协作。
- 能使用 CI、lint、typecheck 保持代码质量。
- 能处理错误、验证输入、管理认证状态。
- 能把需求转成 user story、acceptance criteria 和实现任务。
- 能写出可维护、可扩展、结构清晰的软件。

## 最容易混淆的点

- verification 和 validation：前者看是否按规格正确构建，后者看是否满足真实需求。
- authentication 和 authorization：前者确认身份，后者确认权限。
- unit test 和 HTTP/integration test：前者测小模块，后者测系统交互。
- lint/typecheck/test：lint 看风格和可疑模式，typecheck 看类型，test 看运行行为。
- Git branch 和 commit：branch 是开发线，commit 是历史快照。
- 高 coverage 和好测试：覆盖率高不代表断言有效。
- 能跑和可维护：短期能跑不代表长期容易改。

## 一句话总结

COMP1531 教你如何像软件工程团队一样开发项目：理解需求，设计 API，写可测试的后端代码，用 Git 和 CI 协作，并持续改进代码质量。
