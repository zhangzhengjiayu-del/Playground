# MATH1241 Calculus 知识点详细总结

这份是直接讲知识点的版本，不是刷题模板，也不是凑行数。

来源对应：

- `MATH1231-1241-Calculus-Notes-2020T1.pdf`
- Chapter 1: Functions of Several Variables
- Chapter 2: Integration Techniques
- Chapter 3: Ordinary Differential Equations
- Chapter 4: Taylor Series
- Chapter 5: Averages, Arc Length, Speed and Surface Area

## 1. Calculus 这本书的整体结构

这本 Calculus notes 有 5 章。

它们不是散的。

它们围绕四个核心思想：

```text
变化
累积
近似
建模
```

Chapter 1 讲多变量函数：

```text
一个量同时依赖多个变量时，怎么描述变化？
```

Chapter 2 讲积分技巧：

```text
复杂的累积量怎么计算？
```

Chapter 3 讲 ODE：

```text
如果已知变化规律，怎么求函数本身？
```

Chapter 4 讲 Taylor series、sequences、series：

```text
函数和无限过程怎么近似、怎么收敛？
```

Chapter 5 讲 average、arc length、speed、surface area：

```text
积分和导数如何解释几何量与物理量？
```

## 2. Chapter 1: Functions of Several Variables

这一章把一元函数：

```text
y = f(x)
```

升级成多变量函数：

```text
z = f(x,y)
w = f(x,y,z)
```

以前一个 input 决定 output。

现在多个 input 一起决定 output。

因此“变化率”也不再只有一个方向。

你要问：

```text
x 方向怎么变？
y 方向怎么变？
沿某条路径怎么变？
所有变量都变时怎么近似？
```

## 3. Surfaces in R^3

二变量函数：

```text
z = f(x,y)
```

图像是三维空间里的 surface。

但三维曲面不好画。

所以 notes 用 level curves 帮你理解。

Level curve 是：

```text
f(x,y) = C
```

它表示函数值固定为 `C` 的所有点。

地理上的等高线就是 level curves 的直觉。

如果：

```text
f(x,y)=x^2+y^2
```

那么 level curves 是：

```text
x^2 + y^2 = C
```

也就是一圈圈圆。

这说明 surface 是一个向上开的碗状 paraboloid。

## 4. Partial Derivatives

Partial derivative 的意思是：

```text
一次只看一个变量变化，其他变量固定。
```

对 `f(x,y)`：

```text
f_x = ∂f/∂x
f_y = ∂f/∂y
```

`f_x` 表示：

```text
y 固定时，f 对 x 的变化率。
```

`f_y` 表示：

```text
x 固定时，f 对 y 的变化率。
```

几何上：

```text
f_x 是曲面沿 x 方向切片的 slope。
f_y 是曲面沿 y 方向切片的 slope。
```

注意：

对 `x` 求偏导时，`y` 不是 0，而是 constant。

## 5. Second Partial Derivatives

二阶偏导描述变化率本身如何变化。

常见记号：

```text
f_xx
f_yy
f_xy
f_yx
```

`f_xy` 的意思是：

```text
先对 x 求偏导，再对 y 求偏导。
```

在函数足够 nice 的情况下：

```text
f_xy = f_yx
```

这不是永远无条件成立，但课程里大多数常见函数都满足。

## 6. Tangent Plane

一元函数在一点附近可以用 tangent line 近似。

二元函数在一点附近可以用 tangent plane 近似。

如果：

```text
z = f(x,y)
```

那么在 `(a,b,f(a,b))` 处的 tangent plane 是：

```text
z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)
```

这公式的含义是：

```text
从点 (a,b) 出发，
x 方向变化贡献 f_x(a,b)(x-a)，
y 方向变化贡献 f_y(a,b)(y-b)。
```

它是多变量函数最基本的线性近似。

## 7. Total Differential

Total differential 是 tangent plane 的另一个表达方式。

如果 `x` 改变一点 `dx`，`y` 改变一点 `dy`，那么：

```text
df = f_x dx + f_y dy
```

也就是说：

```text
Δf ≈ f_x Δx + f_y Δy
```

这表达的是：

```text
总变化 ≈ 每个方向变化贡献的和。
```

这就是多变量微积分里非常重要的线性化思想。

## 8. Chain Rule

多变量 chain rule 处理变量之间的依赖关系。

如果：

```text
z = f(x,y)
x = x(t)
y = y(t)
```

那么：

```text
dz/dt = f_x dx/dt + f_y dy/dt
```

意思是：

```text
t 影响 x，x 影响 z；
t 影响 y，y 影响 z；
总变化是所有路径贡献之和。
```

如果：

```text
x = x(s,t)
y = y(s,t)
```

那么：

```text
∂z/∂s = f_x x_s + f_y y_s
∂z/∂t = f_x x_t + f_y y_t
```

Chain rule 的本质是：

```text
沿依赖路径相乘，所有路径相加。
```

## 9. Functions of More Than Two Variables

对三变量函数：

```text
f(x,y,z)
```

一样可以定义：

```text
f_x
f_y
f_z
```

Total differential 变成：

```text
df = f_x dx + f_y dy + f_z dz
```

所以 Chapter 1 的思想不是二变量专用的。

它真正讲的是：

```text
多输入函数的局部变化。
```

## 10. Chapter 2: Integration Techniques

这一章研究的是：

```text
复杂积分怎么化成会算的积分。
```

Integration techniques 的本质不是背很多招，而是识别 integrand 的结构。

不同结构对应不同方法：

```text
trig powers
reduction formulae
trig substitution
hyperbolic substitution
rational functions
partial fractions
ordinary substitution
```

## 11. Trigonometric Integrals

这一节处理：

```text
sin^m x cos^n x
tan^m x sec^n x
```

核心是用三角恒等式把积分变成 substitution 可处理的形式。

常用恒等式：

```text
sin^2 x + cos^2 x = 1
1 + tan^2 x = sec^2 x
sin^2 x = (1 - cos 2x)/2
cos^2 x = (1 + cos 2x)/2
```

为什么要看奇偶？

因为如果 `sin` 或 `cos` 有奇数次幂，你可以留一个出来当 derivative 的搭档。

如果都是偶数次幂，就用 half-angle identity 降幂。

## 12. Reduction Formulae

Reduction formula 的意义是：

```text
把高阶积分递归地化成低阶积分。
```

比如：

```text
I_n = ∫ sin^n x dx
```

你不想每个 `n` 都重新算。

于是建立：

```text
I_n 和 I_{n-2} 的关系
```

这样可以一层层降下去。

Reduction formula 背后的主要工具通常是 integration by parts。

它体现的是：

```text
递归思想。
```

## 13. Trigonometric Substitution

Trig substitution 用来处理根号：

```text
sqrt(a^2 - x^2)
sqrt(a^2 + x^2)
sqrt(x^2 - a^2)
```

标准替换：

```text
x = a sin θ       for sqrt(a^2 - x^2)
x = a tan θ       for sqrt(a^2 + x^2)
x = a sec θ       for sqrt(x^2 - a^2)
```

为什么这样替？

因为三角恒等式会把根号里的结构变简单。

例如：

```text
1 - sin^2 θ = cos^2 θ
```

所以：

```text
sqrt(a^2 - a^2 sin^2 θ)
= a cos θ
```

根号就消失了。

## 14. Rational Functions and Partial Fractions

Rational function 是：

```text
P(x)/Q(x)
```

如果分子次数大于等于分母次数，先做 polynomial division。

之后对 proper rational function 做 partial fractions。

Partial fractions 的意义是：

```text
把复杂分式拆成一堆简单分式。
```

例如：

```text
1 / ((x-1)(x+2))
```

可以拆成：

```text
A/(x-1) + B/(x+2)
```

每一项都容易积分。

如果 denominator 有 irreducible quadratic，例如：

```text
x^2 + 1
```

分子要设成：

```text
Ax + B
```

而不是只设常数。

## 15. Other Substitutions

普通 substitution 的核心结构是：

```text
f(g(x))g'(x)
```

如果你看到 integrand 里有一个“里面的函数”和它的 derivative，就应该考虑：

```text
u = g(x)
```

Substitution 的本质是：

```text
换一个变量，让表达式变简单。
```

它不是技巧，而是 chain rule 的反向使用。

## 16. Chapter 3: Ordinary Differential Equations

ODE 是 ordinary differential equation。

它描述：

```text
未知函数和它的导数之间的关系。
```

例如：

```text
dy/dx = ky
```

这不是让你求一个数，而是求一个函数 `y(x)`。

ODE 的思想是：

```text
已知变化规律，反推出函数。
```

## 17. Initial Value Problems

一个 ODE 通常有一族解。

例如：

```text
dy/dx = ky
```

的解是：

```text
y = Ce^{kx}
```

这里 `C` 可以不同。

Initial condition 例如：

```text
y(0)=2
```

会选出唯一一个解。

所以 IVP 是：

```text
ODE + initial condition
```

## 18. Separable ODEs

Separable ODE 的形式是：

```text
dy/dx = g(x)h(y)
```

它的特点是：

```text
x 和 y 可以分到等号两边。
```

变成：

```text
dy/h(y) = g(x) dx
```

然后两边积分。

Separable ODE 是最直观的一类 ODE。

它本质上是：

```text
把变化率关系拆开，再反积分。
```

## 19. First Order Linear ODEs

一阶线性 ODE 标准形式：

```text
y' + P(x)y = Q(x)
```

关键工具是 integrating factor：

```text
μ(x) = e^{∫P(x) dx}
```

乘上 integrating factor 后，左边会变成一个 product derivative：

```text
(μy)' = μQ
```

这就是 integrating factor 的意义。

它不是魔法，而是把左边强行整理成 product rule 的形式。

## 20. Exact ODEs

Exact ODE 形式：

```text
M(x,y) dx + N(x,y) dy = 0
```

它的思想是：

```text
这是不是某个函数 F(x,y) 的 total differential？
```

如果：

```text
F_x = M
F_y = N
```

那么：

```text
dF = M dx + N dy
```

所以方程等价于：

```text
dF = 0
```

也就是：

```text
F(x,y) = C
```

Exact condition 通常是：

```text
M_y = N_x
```

## 21. Modelling with ODEs

ODE 建模的核心是：

```text
rate of change = 原因
```

Mixing problem 常见结构：

```text
amount' = rate in - rate out
```

Population model 常见结构：

```text
population growth rate depends on population
```

比如 exponential growth：

```text
dP/dt = kP
```

表示增长率和当前人口成正比。

ODE 建模最重要的是先定义变量和单位。

公式不是第一步。

## 22. Second Order Linear ODEs

常系数二阶线性 ODE：

```text
ay'' + by' + cy = 0
```

用试探：

```text
y = e^{rx}
```

代入后得到 characteristic equation：

```text
ar^2 + br + c = 0
```

根的类型决定解的形状。

不同实根：

```text
y = C1e^{r1x} + C2e^{r2x}
```

重根：

```text
y = (C1 + C2x)e^{rx}
```

复根 `α ± βi`：

```text
y = e^{αx}(C1 cos βx + C2 sin βx)
```

这和线性代数里的 eigenvalue 思想有联系。

## 23. Chapter 4: Taylor Series, Sequences, Infinite Series

Chapter 4 的主题是：

```text
无限过程和函数近似。
```

它包括：

```text
Taylor polynomials
Taylor theorem
sequences
infinite series
convergence tests
Taylor series
power series
```

这一章很容易碎，但主线其实很清楚：

```text
用有限多项式近似函数；
再研究无限项时是否收敛。
```

## 24. Taylor Polynomial

Taylor polynomial 是用多项式近似函数。

在 `x=a` 附近：

```text
P_n(x) = f(a)
       + f'(a)(x-a)
       + f''(a)/2! (x-a)^2
       + ...
       + f^(n)(a)/n! (x-a)^n
```

如果 `a=0`，叫 Maclaurin polynomial。

意义：

```text
复杂函数在某点附近，可以用 polynomial 近似。
```

Polynomial 容易计算，所以 Taylor polynomial 是近似工具。

## 25. Taylor Theorem

Taylor theorem 不只是给公式。

它还告诉你：

```text
近似误差是什么。
```

也就是说：

```text
函数 = Taylor polynomial + remainder
```

这让 Taylor approximation 从“猜测”变成有理论保证的近似。

Taylor theorem 也解释了为什么二阶导数可以判断 stationary point。

因为在 critical point 附近，低阶非零项决定函数形状。

## 26. Sequences

Sequence 是：

```text
a_1, a_2, a_3, ...
```

它研究的是：

```text
n -> infinity 时 a_n 怎么变化。
```

如果 `a_n` 趋向某个有限值 `L`，就说 sequence converges to `L`。

如果没有有限极限，就 diverges。

Sequence 是 series 的基础。

因为 series 的收敛其实是在研究 partial sums 这个 sequence。

## 27. Infinite Series

Infinite series 是：

```text
Σ a_n
```

它不是直接看 `a_n`，而是看 partial sums：

```text
S_N = a_1 + ... + a_N
```

如果：

```text
S_N -> S
```

那么 series converges。

非常重要：

```text
a_n -> 0 是 series 收敛的必要条件，不是充分条件。
```

例如 harmonic series：

```text
Σ 1/n
```

虽然 `1/n -> 0`，但 series diverges。

## 28. Convergence Tests

Series convergence tests 是 Chapter 4 的核心。

常见 tests：

```text
nth term divergence test
integral test
comparison test
limit comparison test
ratio test
alternating series test
absolute convergence
```

每个 test 都有自己的适用对象。

Ratio test 特别适合：

```text
factorials
exponentials
n 次幂结构
```

Alternating series test 适合：

```text
正负交替的 series
```

但要检查项的大小递减并趋向 0。

Absolute convergence 比 ordinary convergence 更强。

## 29. Taylor Series

Taylor series 是 Taylor polynomial 的无限版本：

```text
Σ f^(n)(a)/n! (x-a)^n
```

常见 Maclaurin series：

```text
e^x
sin x
cos x
1/(1-x)
ln(1+x)
```

这些基本展开很重要，因为很多复杂 series 可以从它们通过 substitution、differentiation、integration 得到。

Taylor series 的重点不是只写出展开，而是知道：

```text
在哪些 x 上收敛？
收敛到原函数吗？
```

## 30. Power Series

Power series 形式：

```text
Σ c_n (x-a)^n
```

它像一个无限多项式。

核心问题是：

```text
它在哪些 x 上收敛？
```

通常会有 radius of convergence：

```text
|x-a| < R
```

但 endpoints 要单独检查。

这是 power series 里最容易漏的点。

## 31. Chapter 5: Applications

Chapter 5 讲：

```text
average value
arc length
speed
surface area
```

这章的共同点是：

```text
用积分累积小量。
```

Average value 是累积后除以长度。

Arc length 是累积小线段。

Speed 是位置变化率的大小。

Surface area 是累积旋转后的小表面积。

## 32. Average Value

函数在 `[a,b]` 上的 average value：

```text
f_avg = 1/(b-a) ∫_a^b f(x) dx
```

意义：

```text
总累积量 / 区间长度
```

这和普通平均数思想一致，只是连续版本。

## 33. Arc Length

如果曲线是：

```text
y = f(x)
```

那么弧长：

```text
L = ∫_a^b sqrt(1 + (f'(x))^2) dx
```

如果曲线参数化：

```text
r(t) = (x(t), y(t))
```

弧长：

```text
L = ∫ sqrt((x'(t))^2 + (y'(t))^2) dt
```

本质都是：

```text
小线段长度 = sqrt(dx^2 + dy^2)
```

再把所有小线段累积起来。

## 34. Speed

如果 position vector 是：

```text
r(t)
```

velocity 是：

```text
r'(t)
```

speed 是 velocity 的 magnitude：

```text
|r'(t)|
```

注意：

```text
velocity 是 vector。
speed 是 number。
```

总路程是：

```text
∫ speed dt
```

这和 arc length 是同一个结构。

## 35. Surface Area

Surface of revolution 的表面积可以理解成：

```text
小圆台面积 ≈ circumference × arc length element
```

所以公式结构是：

```text
S = 2π ∫ radius ds
```

如果绕 x-axis 旋转，radius 通常是 `y`。

如果绕 y-axis 旋转，radius 通常是 `x`。

这里最重要的是理解：

```text
2π radius
```

来自圆周长；

```text
ds
```

来自曲线的小弧长。

## 36. Calculus 全书知识关系图

```text
多变量函数
  -> partial derivatives
  -> tangent plane
  -> differential approximation
  -> chain rule

积分技巧
  -> substitution
  -> trig identities
  -> partial fractions
  -> reduction formulae

ODE
  -> separable
  -> first-order linear
  -> exact
  -> second-order linear
  -> modelling

Taylor and series
  -> Taylor polynomial
  -> Taylor theorem
  -> sequences
  -> series
  -> convergence tests
  -> power series

applications
  -> average value
  -> arc length
  -> speed
  -> surface area
```

## 37. Calculus 最重要的概念总结

如果只抓核心：

```text
partial derivative 是一个变量方向上的变化率。
tangent plane 是多变量函数的线性近似。
total differential 是小变化的总近似。
chain rule 是依赖路径上的变化相乘相加。
integration techniques 是把复杂累积转化成可算形式。
ODE 是由变化规律反推函数。
Taylor polynomial 是局部多项式近似。
series 收敛看的是 partial sums。
power series 是无限多项式，必须关心收敛区间。
average value 是连续平均。
arc length 是小线段长度的累积。
speed 是 velocity 的大小。
surface area of revolution 是圆周长乘弧长元素的累积。
```

