# MATH1241 Calculus 全书详细总结

> 依据：
>
> - [MATH1231-1241-Calculus-Notes-2020T1.pdf](/Users/apple/Desktop/📖/正学/1241%20calculus/MATH1231-1241-Calculus-Notes-2020T1.pdf)
>
> 这份总结按这本 notes 的全书结构整理，不再只停留在 Chapter 1。
>
> 全书主线：
>
> ```text
> Chapter 1: functions of several variables
> Chapter 2: integration techniques
> Chapter 3: ordinary differential equations
> Chapter 4: Taylor series, sequences, infinite series, power series
> Chapter 5: averages, arc length, speed, surface area
> ```

## 1. 这本 Calculus notes 到底在讲什么

这本书不是一本“单一主题”的 multivariable calculus 讲义。

它其实把一整学期的 calculus strand 串成了 5 块：

```text
1. 多变量微积分入门
2. 各种积分技巧
3. 常微分方程
4. Taylor、多项式近似、数列与级数
5. 弧长、平均值、速度、表面积
```

所以读这本书时最好不要只按“都会求导积分”来想，而要按下面这条学习逻辑来想：

```text
先学局部变化怎么描述
-> 再学复杂积分怎么处理
-> 再学变化规律怎么写成 ODE
-> 再学无限过程怎么近似/求和
-> 最后学几个经典几何/物理应用
```

一句话总结全书：

```text
这本 notes 在训练你把“变化、累积、近似、建模”看成同一条 calculus 主线。
```

## 2. Chapter 1 总览：Functions of Several Variables

Chapter 1 的目录是：

```text
1.1 Sketching simple surfaces in R^3
1.2 Partial differentiation
1.3 Tangent planes to surfaces
1.4 The total differential approximation
1.5 Chain rules
1.6 Functions of more than two variables
```

这一章是把一元微积分升级成多变量微积分。

以前你学的是：

```text
y = f(x)
```

现在你学的是：

```text
z = f(x, y)
w = f(x, y, z)
```

问题也升级成：

```text
函数在不同方向怎么变？
曲面在一点附近能不能用平面近似？
多个变量之间互相依赖时怎么求导？
```

### 2.1 Surfaces 和 level curves

对函数：

```text
z = F(x,y)
```

graph 是 `R^3` 里的 surface。

但直接画 surface 不容易，所以 notes 先用 level curves：

```text
F(x,y) = C
```

这就是在 `xy` 平面里的等高线。

最经典例子：

```text
F(x,y) = x^2 + y^2
```

level curves:

```text
x^2 + y^2 = C
```

是圆。

于是你应该立刻联想到：

```text
这张 surface 是一个 upward opening paraboloid。
```

做 sketch 题时，最好用两步：

```text
1. 先看 level curves
2. 再看某个 coordinate plane 截面
```

例如：

```text
x = 0
```

时看 `yz` 截面；

```text
y = 0
```

时看 `xz` 截面。

### 2.2 Partial derivatives

偏导的核心意思：

```text
一次只让一个变量动，其他变量先冻结。
```

对 `f(x,y)`：

```text
f_x = ∂f/∂x
f_y = ∂f/∂y
```

意思是：

```text
f_x: hold y constant
f_y: hold x constant
```

人话：

```text
偏导就是“沿 coordinate 方向的变化率”。
```

例如：

```text
f(x,y) = x^2 y + sin(xy)
```

则：

```text
f_x = 2xy + y cos(xy)
f_y = x^2 + x cos(xy)
```

二阶偏导：

```text
f_xx, f_yy, f_xy, f_yx
```

如果函数够 nice，通常：

```text
f_xy = f_yx
```

### 2.3 Tangent plane

对 surface：

```text
z = f(x,y)
```

在 `(a,b,f(a,b))` 处 tangent plane：

```text
z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)
```

这公式非常重要，因为它告诉你：

```text
曲面在一点附近，最自然的线性近似就是 tangent plane。
```

### 2.4 Total differential approximation

如果 `x,y` 有小变化：

```text
dx, dy
```

那么函数值的小变化可以近似为：

```text
df = f_x dx + f_y dy
```

也就是说：

```text
Δf ≈ f_x Δx + f_y Δy
```

这本质上和 tangent plane 是同一件事：

```text
局部线性化。
```

### 2.5 Chain rule

如果：

```text
z = f(x,y), x=x(t), y=y(t)
```

则：

```text
dz/dt = f_x dx/dt + f_y dy/dt
```

如果 `x,y` 又依赖于两个变量，例如：

```text
x=x(s,t), y=y(s,t)
```

则：

```text
∂z/∂s = f_x ∂x/∂s + f_y ∂y/∂s
∂z/∂t = f_x ∂x/∂t + f_y ∂y/∂t
```

最好永远画 dependency tree：

```text
z
↙ ↘
x   y
↙↘ ↙↘
s t s t
```

所有路径乘起来再相加。

### 2.6 More than two variables

这一节本质上是告诉你：

```text
前面的想法不是只对 2 variables 有效。
```

对 `f(x,y,z)` 一样可以：

```text
求偏导
做局部线性近似
写 chain rule
```

所以 Chapter 1 最重要的收获是：

```text
多变量 calculus 的核心语言 = level curves + partial derivatives + tangent plane + linear approximation + chain rule
```

## 3. Chapter 1 做题模板

Sketch surface：

```text
1. Find level curves.
2. Examine coordinate slices.
3. Use both to infer shape.
```

Partial derivatives：

```text
对 x 求偏导时，其他变量都当 constant。
```

Tangent plane：

```text
先算 f(a,b), f_x(a,b), f_y(a,b)
再套公式
```

Approximation：

```text
Δf ≈ f_xΔx + f_yΔy
```

Chain rule：

```text
画依赖图
沿每条路径相乘
最后相加
```

## 4. Chapter 2 总览：Integration Techniques

Chapter 2 的目录是：

```text
2.1 Trigonometric integrals
2.2 Reduction formulae
2.3 Trigonometric and hyperbolic substitutions
2.4 Integrating rational functions
2.5 Other substitutions
```

这一章的核心不是“有多少技巧”，而是：

```text
看到 integrand 的结构，快速判断该用哪类方法。
```

也就是说：

```text
integration techniques 不是靠蛮力，而是靠 pattern recognition。
```

### 4.1 Trigonometric integrals

最常见三类：

```text
powers of sin/cos
multiple angles
powers of tan/sec
```

最重要的判断法：

#### 情况 A：`sin^m x cos^n x`

如果某个指数是奇数，通常先留一个出来，再把剩下部分改写成另一个函数。

例如：

```text
sin^3 x = sin x (1 - cos^2 x)
cos^3 x = cos x (1 - sin^2 x)
```

然后 substitution。

如果两个指数都偶数，通常用 half-angle identities：

```text
sin^2 x = (1 - cos 2x)/2
cos^2 x = (1 + cos 2x)/2
```

#### 情况 B：`tan^m x sec^n x`

如果 `sec` 指数是偶数，通常留出：

```text
sec^2 x
```

并把其他 `sec^2 x` 改成：

```text
1 + tan^2 x
```

如果 `tan` 指数是奇数，通常留出：

```text
sec x tan x
```

并把其他 `tan^2 x` 改成：

```text
sec^2 x - 1
```

### 4.2 Reduction formulae

Reduction formula 的想法是：

```text
把高次积分变成低次积分，
建立一个递推关系。
```

它本质上是 integration by parts 的系统化版本。

你需要理解的不是单个公式，而是这种思路：

```text
I_n expressed in terms of I_{n-1} or I_{n-2}
```

然后递归往下压。

### 4.3 Trigonometric and hyperbolic substitutions

看到根号形式时，先想标准 substitution：

```text
sqrt(a^2 - x^2)   -> x = a sin θ
sqrt(a^2 + x^2)   -> x = a tan θ
sqrt(x^2 - a^2)   -> x = a sec θ
```

直觉是：

```text
用 trig identity 把根号吃掉。
```

对应 identities：

```text
1 - sin^2 θ = cos^2 θ
1 + tan^2 θ = sec^2 θ
sec^2 θ - 1 = tan^2 θ
```

有时也会用 hyperbolic substitution，本质也是为了简化根号结构。

### 4.4 Rational functions

这是 Chapter 2 最像“系统流程”的部分。

对 rational function：

```text
P(x)/Q(x)
```

先判断：

```text
proper? 还是 improper?
```

如果 improper：

```text
先 polynomial division
```

然后对 proper rational function 做 partial fractions。

整体策略：

```text
1. If degree(P) >= degree(Q), divide first.
2. Factor Q(x) as much as possible.
3. Decompose into partial fractions.
4. Integrate each piece.
```

Partial fractions 的基本块：

```text
linear factor: A/(x-a)
repeated linear: A1/(x-a) + A2/(x-a)^2 + ...
irreducible quadratic: (Ax+B)/(x^2+bx+c)
repeated quadratic: similar layered structure
```

### 4.5 Other substitutions

这节提醒你：

```text
substitution 不只是 trig substitution。
```

有些 integrand 看起来乱，但如果能识别“里面那坨函数的导数也差不多在外面”，那就应该直接做 `u`-sub。

例如：

```text
f(g(x)) g'(x)
```

这是 substitution 最标准的信号。

## 5. Chapter 2 做题总思路

看到积分先问：

```text
这是哪一类？
```

快速决策树：

```text
有 sin/cos/tan/sec 的幂 -> trig integral
有 sqrt(a^2 ± x^2) 或 sqrt(x^2-a^2) -> trig substitution
是 rational function -> divide + partial fractions
长得像 f(g(x))g'(x) -> ordinary substitution
可以反复降阶 -> reduction formula
```

Chapter 2 最重要的不是背完所有公式，而是会分类。

## 6. Chapter 3 总览：Ordinary Differential Equations

Chapter 3 的目录是：

```text
3.1 An introduction
3.2 Initial value problems
3.3 Separable ODEs
3.4 First order linear ODEs
3.5 Exact ODEs
3.6 Solving ODEs by using a change of variable [X]
3.7 Modelling with first order ODEs
3.8 Second order linear ODEs with constant coefficients
```

这一章的核心是：

```text
把“变化规律”写成方程，然后解这个方程。
```

你不再只是求导，而是反过来：

```text
已知导数关系，求函数本身。
```

### 6.1 What is an ODE?

ODE 是 ordinary differential equation。

例如：

```text
dy/dx = ky
y'' + 3y' + 2y = 0
```

它描述的是：

```text
未知函数和它的导数之间的关系。
```

解 ODE 不是求一个数，而是求一个函数。

### 6.2 Initial value problems

IVP = initial value problem。

也就是：

```text
ODE + initial condition
```

例如：

```text
dy/dx = ky,   y(0)=2
```

ODE 本身给你一族函数；

initial condition 用来选出唯一那一条。

### 6.3 Separable ODEs

Separable 的标准形：

```text
dy/dx = g(x) h(y)
```

把 `y` 相关的放一边，`x` 相关的放另一边：

```text
dy/h(y) = g(x) dx
```

然后两边积分。

这是最基础的一类 ODE。

重点是：

```text
先分离变量，再积分，再代初值。
```

### 6.4 First order linear ODEs

标准形：

```text
y' + P(x)y = Q(x)
```

关键工具：

```text
integrating factor
```

定义：

```text
μ(x) = e^{∫P(x)dx}
```

乘上去之后左边会变成：

```text
(μy)'
```

于是：

```text
(μy)' = μQ
```

再积分即可。

这是 Chapter 3 最重要的机械流程之一。

### 6.5 Exact ODEs

标准形：

```text
M(x,y) dx + N(x,y) dy = 0
```

如果存在某个 potential function `F(x,y)` 使得：

```text
F_x = M
F_y = N
```

则 ODE 是 exact。

判定条件通常是：

```text
M_y = N_x
```

解法：

```text
找 F(x,y)
然后写 F(x,y) = C
```

这和 conservative field 的思路其实非常像。

### 6.6 Change of variable [X]

这一节是 MATH1241 的额外内容。

核心思想：

```text
如果原方程不直接 separable / linear / exact，
也许通过换变量能把它变成熟悉类型。
```

### 6.7 Modelling with first order ODEs

这一节告诉你 ODE 不只是技巧题，它是建模语言。

典型模型：

```text
mixing problems
population models
```

Mixing problems 的主线：

```text
rate of change = rate in - rate out
```

Population models 的主线：

```text
growth proportional to current population
```

或者 logistic-style thinking。

### 6.8 Second order linear ODEs with constant coefficients

标准形：

```text
ay'' + by' + cy = g(x)
```

先看 homogeneous case：

```text
ay'' + by' + cy = 0
```

用 trial solution：

```text
y = e^{rx}
```

得到 characteristic equation：

```text
ar^2 + br + c = 0
```

分三种根：

```text
distinct real roots
repeated real root
complex conjugate roots
```

对应解型：

```text
y = C1 e^{r1x} + C2 e^{r2x}
y = (C1 + C2 x)e^{rx}
y = e^{αx}(C1 cos βx + C2 sin βx)
```

non-homogeneous case：

```text
general solution = complementary function + particular solution
```

应用里常见 vibration / resonance。

## 7. Chapter 3 做题模板

先分类 ODE：

```text
separable?
linear first-order?
exact?
constant-coefficient second-order?
```

对应方法：

```text
separable -> separate and integrate
linear -> integrating factor
exact -> find potential F
second-order constant coeff -> characteristic equation
```

建模题先写：

```text
rate of change = ...
```

别急着上公式。

## 8. Chapter 4 总览：Taylor Series, Sequences, Infinite Series

Chapter 4 的目录是：

```text
4.1 Taylor polynomials
4.2 Taylor’s theorem
4.3 Sequences
4.4 Infinite series
4.5 Tests for series convergence
4.6 Taylor series
4.7 Power series
4.8 Manipulation of power series
```

这是全书最“无限过程”也最容易混淆的一章。

它在做几件事：

```text
用多项式近似函数
研究无限数列/级数有没有极限
研究 power series 在哪里收敛
用 Taylor series 表示函数
```

### 8.1 Taylor polynomials

Taylor polynomial 的想法：

```text
在某个点附近，用 polynomial 近似函数。
```

在 `x=a` 附近的 n 次 Taylor polynomial：

```text
P_n(x) = f(a)
      + f'(a)(x-a)
      + f''(a)/2! (x-a)^2
      + ...
      + f^(n)(a)/n! (x-a)^n
```

如果 `a=0`，就是 Maclaurin polynomial。

直觉：

```text
polynomial 比较好算，所以我们用它来近似复杂函数。
```

### 8.2 Taylor’s theorem

Taylor theorem 告诉你：

```text
不仅能写近似式，
还能控制误差 remainder。
```

重要的不只是公式，而是概念：

```text
Taylor polynomial 是局部近似，
并且 theorem 告诉你这近似到底有多靠谱。
```

### 8.3 Stationary points

这一节把 Taylor thinking 用到 extremum classification。

在一元函数里：

```text
f'(a)=0
```

说明可能是 stationary point。

再看更高阶导数或二阶导数来分类。

也就是说：

```text
Taylor expansion 可以解释为什么 second derivative test 有效。
```

### 8.4 Sequences

Sequence 就是一串数：

```text
a_1, a_2, a_3, ...
```

研究重点：

```text
n -> infinity 时，它趋向哪里？
```

你需要掌握：

```text
convergent / divergent
monotone
bounded
limit laws
```

常见技巧：

```text
algebraic simplification
squeeze-type thinking
dominant term comparison
recurrence intuition
```

### 8.5 Infinite series

Series 是：

```text
sum a_n
```

本质上研究 partial sums：

```text
S_N = a_1 + ... + a_N
```

如果 `S_N` 有极限，series converges。

你一定要把 sequence 和 series 分清：

```text
sequence 看 a_n
series 看 S_N
```

### 8.6 Convergence tests

这一节是考试高频。

主要 tests：

```text
kth term divergence test
integral test
comparison test
limit comparison test [X]
ratio test
Leibniz test for alternating series
absolute vs conditional convergence
```

每个 test 都有适用场景。

#### kth term divergence test

如果：

```text
a_n does not tend to 0
```

则：

```text
sum a_n diverges
```

但反过来不成立：

```text
a_n -> 0
```

不代表 series 一定 converges。

#### Integral test

适用于：

```text
positive, decreasing, continuous terms
```

把 series 和 improper integral 对应起来比较。

#### Comparison test

适合正项级数。

想法：

```text
拿大的已知发散级数压它，
或拿小的已知收敛级数夹它。
```

#### Ratio test

特别适合：

```text
factorials
exponentials
powers with n in exponent
```

看：

```text
L = lim |a_{n+1}/a_n|
```

如果：

```text
L < 1 -> converges absolutely
L > 1 -> diverges
L = 1 -> inconclusive
```

#### Leibniz test

对 alternating series：

```text
sum (-1)^n b_n
```

如果：

```text
b_n decreases to 0
```

则 series converges。

#### Absolute vs conditional convergence

如果：

```text
sum |a_n|
```

收敛，则 `sum a_n` absolutely convergent。

如果：

```text
sum a_n` 收敛但 `sum |a_n|` 发散
```

则 conditionally convergent。

这是概念上很重要的层级：

```text
absolute convergence 比普通 convergence 更强。
```

### 8.7 Taylor series

Taylor series 是把 Taylor polynomial 推到无限：

```text
sum_{n=0}^\infty f^(n)(a)/n! (x-a)^n
```

最关键的是认熟经典展开：

```text
e^x
sin x
cos x
1/(1-x)
ln(1+x)
```

然后会做：

```text
substitute
differentiate
integrate
shift center
```

### 8.8 Power series

标准形：

```text
sum c_n (x-a)^n
```

研究重点：

```text
它对哪些 x 收敛？
```

这就引出：

```text
radius of convergence R
interval of convergence
```

通常用 ratio test 找：

```text
|x-a| < R
```

注意：

```text
端点要单独检查。
```

这点非常常考。

### 8.9 Manipulation of power series

Power series 很强，是因为你能对它做合法操作：

```text
differentiate term-by-term
integrate term-by-term
multiply by x
substitute simple expressions
```

于是你可以从一个已知展开推很多新展开。

## 9. Chapter 4 做题模板

Taylor polynomial：

```text
写到指定次数
带入导数在 a 的值
```

Series convergence：

```text
1. 先看 a_n -> 0 吗
2. 再判断正项/交错/含 factorial/exponential
3. 选测试方法
```

Power series：

```text
先找 radius
再单独测 endpoints
```

操作展开式：

```text
从基本 series 出发
再 substitution / differentiation / integration
```

## 10. Chapter 5 总览：Averages, Arc Length, Speed and Surface Area

Chapter 5 的目录是：

```text
5.1 The average value of a function
5.2 The arc length of a curve
5.3 The speed of a moving particle
5.4 Surface area
```

这一章像一个“应用章”，把前面学过的积分和参数化工具用在几何和物理问题上。

### 10.1 Average value of a function

在区间 `[a,b]` 上，函数平均值：

```text
f_avg = 1/(b-a) ∫_a^b f(x) dx
```

人话：

```text
把函数的总量除以区间长度。
```

这和“平均速度 = 总路程 / 总时间”的结构是一样的。

### 10.2 Arc length

Arc length 是 Chapter 5 的核心。

对 parameterised curve：

```text
r(t) = (x(t), y(t)),  a <= t <= b
```

弧长公式：

```text
L = ∫_a^b sqrt((dx/dt)^2 + (dy/dt)^2) dt
```

如果是空间曲线：

```text
r(t) = (x(t), y(t), z(t))
```

则：

```text
L = ∫_a^b sqrt((x')^2 + (y')^2 + (z')^2) dt
```

如果曲线是 graph：

```text
y = f(x), a <= x <= b
```

则：

```text
L = ∫_a^b sqrt(1 + (f'(x))^2) dx
```

如果是 polar curve：

```text
r = r(θ)
```

则：

```text
L = ∫ sqrt(r^2 + (dr/dθ)^2) dθ
```

这几个公式最好统一理解为：

```text
小段长度 ≈ sqrt(sum of squared coordinate changes)
```

### 10.3 Speed of a moving particle

如果位置向量：

```text
r(t)
```

那么 velocity：

```text
v(t) = r'(t)
```

speed 是其大小：

```text
|v(t)| = |r'(t)|
```

也就是说：

```text
speed 是弧长对时间的变化率。
```

所以：

```text
distance travelled = ∫ speed dt
```

### 10.4 Surface area

这一节最经典的是 surface of revolution。

如果曲线 `y=f(x)` 绕 x-axis 旋转，表面积通常是：

```text
S = 2π ∫_a^b y sqrt(1 + (y')^2) dx
```

如果绕 y-axis 旋转，结构类似，只是半径换掉。

本质上：

```text
小块表面积 ≈ circumference × tiny arc length
```

所以这节是把：

```text
arc length + rotation geometry
```

拼起来。

## 11. Chapter 5 做题模板

Average value：

```text
总量 / 区间长度
```

Arc length：

```text
先判断是 graph / parametric / polar 哪一类
再套对应公式
```

Speed：

```text
先求 r'(t)
再取 magnitude
```

Surface area：

```text
先认清绕哪条轴转
找半径
乘上 arc length element
```

## 12. 全书五章之间怎么连起来

如果你只把这本书看成“五章分散内容”，会觉得很碎。

其实它的逻辑是统一的：

```text
Chapter 1:
研究多个变量下的局部变化。

Chapter 2:
研究复杂表达式的累积怎么计算。

Chapter 3:
把变化规律本身写成方程。

Chapter 4:
研究无限近似、无限求和、函数展开。

Chapter 5:
把前面的工具拿去做几何和物理应用。
```

可以把它们压成四个关键词：

```text
change
accumulation
approximation
modelling
```

这四个词基本就是整个 calculus strand 的骨架。

## 13. 全书最常见的混淆点

```text
1. Chapter 1 的 tangent plane 和 total differential 本质是同一个局部线性化思想。
2. Chapter 2 的 integration techniques 重点是识别结构，不是硬背所有招数。
3. Chapter 3 的 ODE 是“求函数”，不是“求一个数”。
4. separable / linear / exact ODE 是三种不同分类，不要混着套。
5. Chapter 4 里 sequence 看 a_n，series 看 partial sums S_n。
6. a_n -> 0 只是 series 收敛的必要条件，不是充分条件。
7. power series 求完 radius 之后，端点必须单独检查。
8. Chapter 5 的 speed 是 velocity 的 magnitude，不是 vector。
9. arc length 公式看起来多，其实全都来自同一个 distance idea。
10. surface area 题最容易漏“半径”或者漏根号里的导数平方。
```

## 14. 全书复习顺序建议

如果你准备考试，建议按这个顺序复习：

### 第一轮：主干概念

```text
Chapter 1:
partial derivatives, tangent plane, chain rule

Chapter 2:
trig integrals, substitution, partial fractions

Chapter 3:
separable, first-order linear, second-order constant coefficient

Chapter 4:
Taylor polynomial, convergence tests, power series

Chapter 5:
average value, arc length, speed, surface area
```

### 第二轮：题型分类

```text
看到题先判断属于哪一类。
```

不要一上来算。

### 第三轮：公式默写

尤其是这些：

```text
tangent plane
total differential
chain rule
integrating factor
characteristic equation
Taylor polynomial
ratio test
arc length
surface area of revolution
```

### 第四轮：易错点回看

特别看：

```text
series convergence
partial fractions setup
ODE 分类
arc length/surface area 公式选择
```

## 15. 全书做题 checklist

### Chapter 1

```text
会看 level curves
会算 partial derivatives
会写 tangent plane
会用 differential approximation
会画 chain-rule dependency tree
```

### Chapter 2

```text
看到 trig powers 知道怎么拆
看到 sqrt(a^2 ± x^2) 知道 substitution
看到 rational function 知道先 divide 再 partial fractions
```

### Chapter 3

```text
能分类 ODE
会解 separable
会用 integrating factor
会判断 exact
会做 characteristic equation
```

### Chapter 4

```text
会写 Taylor polynomial
会判断 sequence/series convergence
会选 test
会找 radius of convergence
会单独检查 endpoints
会从基本 power series 推新展开
```

### Chapter 5

```text
会算 average value
会认 arc length 公式
会从 position 求 speed
会做 surface area of revolution
```

## 16. 全书考前一页纸

最该背熟的公式和关键词：

```text
Chapter 1
partial derivatives
tangent plane:
z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)
df = f_x dx + f_y dy
chain rule

Chapter 2
trig identities
standard trig substitutions
partial fractions decomposition

Chapter 3
separable: separate and integrate
linear first-order: μ = e^{∫P(x)dx}
exact: M_y = N_x
second-order homogeneous: ar^2 + br + c = 0

Chapter 4
Taylor polynomial
Taylor series
kth term divergence test
integral/comparison/ratio/alternating tests
power series radius of convergence

Chapter 5
average value: (1/(b-a))∫_a^b f(x)dx
arc length:
L = ∫ sqrt(1 + (y')^2) dx
or L = ∫ |r'(t)| dt
speed = |r'(t)|
surface area of revolution:
S = 2π ∫ radius × ds
```

## 17. 最后一句 tutor 风格总结

这本 Calculus notes 真正想让你形成的直觉不是：

```text
“我会很多公式。”
```

而是：

```text
我看到一个问题，能先判断它属于哪种变化/累积/近似/建模结构，
再选对公式和方法。
```

如果你能做到这件事，这本书的主线其实已经被你抓住了。
