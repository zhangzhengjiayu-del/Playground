# MATH1241 总结导航：Algebra + Calculus

这份原文件保留 Week 1 的合并讲解。完整复习版已经按你说的拆成两个方向：

- [MATH1241 Algebra 全书详细总结](/Users/apple/Documents/Playground/math1241_algebra_summary.md)
- [MATH1241 Calculus 全书详细总结](/Users/apple/Documents/Playground/math1241_calculus_summary.md)

建议复习顺序：

```text
Algebra:
vector space -> subspace -> span/independence -> basis/dimension
-> linear transformation -> kernel/image -> eigen/diagonalisation
-> inner product/projection

Calculus:
multivariable functions -> partial derivatives -> tangent plane
-> chain rule/gradient -> optimisation -> double/triple integrals
-> vector fields/line integrals
```

# MATH1241 Week 1 总结：Algebra + Calculus

> 来源：
>
> - Algebra: `Math1241_01.pdf`, `Math1241_01plv.pdf`, `Math1241_02.pdf`, `Math1241_02plv.pdf`
> - Calculus: `student chap1A 1241.pdf`, `student chap1B 1241.pdf`, `student chap1C 1241.pdf`
>
> 这份总结按 tutor 讲课风格整理：代数部分讲 abstract vector spaces 和 subspaces；微积分部分讲 functions of several variables、partial derivatives、tangent planes、differential approximation、chain rule。

## Part A: Algebra

## 1. MATH1241 Algebra 在 Week 1 想做什么？

MATH1141 里我们见过很多“向量”：

- 平面/空间里的箭头；
- `R^2`、`R^3` 里的列向量；
- `R^n`；
- matrices；
- polynomials。

MATH1241 的第一步是把这些例子抽象出来：它们虽然长得不一样，但都有“可以相加”“可以被数乘”“满足类似规则”的共同结构。

这就是 vector space 的思想。

Tutor 直觉讲法：以前你把 vector 想成箭头；现在要把 vector 想成“任何满足向量空间规则的对象”。它可以是矩阵、函数、多项式，甚至有限域上的 n-tuples。

## 2. Field 是什么？

Vector space 是“over a field F”的结构，所以先要知道 field。

Field 是一个非空集合 `F`，带有两个运算：

- addition `+`
- multiplication `·`

并满足常见的数的运算法则，例如：

- 加法/乘法封闭；
- 结合律；
- 交换律；
- 分配律；
- 有 0 和 1；
- 非零元素有乘法逆元。

常见 examples：

- `Q` rational numbers；
- `R` real numbers；
- `C` complex numbers；
- `Q(sqrt(3)) = {a + b sqrt(3) | a,b in Q}`；
- `Q(i) = {a + bi | a,b in Q}`；
- finite field `F_p = {0,1,...,p-1}` when `p` is prime, with arithmetic mod `p`。

在课程里，`F` 通常表示任意 field。如果不确定，就先把它想成 `R`。

## 3. Vector Space 的定义

一个 vector space over field `F` 是一个非空集合 `V`，里面的元素叫 vectors，并且定义了：

- vector addition：`u + v`
- scalar multiplication：`lambda v`

这些运算要满足 10 条公理。

### Addition 相关公理

1. Closure under addition：如果 `u,v in V`，则 `u+v in V`。
2. Associativity：`(u+v)+w = u+(v+w)`。
3. Commutativity：`u+v = v+u`。
4. Zero vector：存在 `0 in V`，使得 `v+0 = v`。
5. Negative：每个 `v` 都有 `-v`，使得 `v+(-v)=0`。

这些说明 `(V,+)` 像一个 abelian group。

### Scalar multiplication 相关公理

6. Closure under scalar multiplication：如果 `lambda in F` 且 `v in V`，则 `lambda v in V`。
7. Associativity of scalar action：`lambda(mu v) = (lambda mu)v`。
8. Identity scalar：`1v = v`。

### Distributive laws

9. Scalar distributive law：`(lambda + mu)v = lambda v + mu v`。
10. Vector distributive law：`lambda(u+v) = lambda u + lambda v`。

Tutor 提醒：证明一个全新的集合是 vector space 很麻烦，因为要查 10 条；后面我们会用 subspace test 来省力。

## 4. 从公理推出的基本性质

在任意 vector space 中：

1. Zero vector 唯一；
2. Cancellation property：如果 `u+v = u+w`，则 `v=w`；
3. Negative 唯一；
4. `lambda 0 = 0`；
5. `0v = 0`；
6. `(-1)v = -v`；
7. 如果 `lambda v = 0`，则 `lambda = 0` 或 `v = 0`；
8. 如果 `lambda v = mu v` 且 `v != 0`，则 `lambda = mu`。

这些性质很像你熟悉的数的性质，但注意它们是从 vector space axioms 推出来的，不是默认“看起来显然”。

## 5. Standard Examples of Vector Spaces

### `F^n`

所有 n 维列向量：

```text
F^n = {(a1, a2, ..., an)^T | ai in F}
```

加法和数乘逐分量进行。

### Matrix space `M_{m,n}(F)`

所有 `m x n` matrices，entry 来自 `F`。

加法：对应位置相加。

数乘：每个 entry 乘 scalar。

### Function space `F[X]`

所有 domain 是非空集合 `X`、值在 `F` 的函数。

如果 `f,g in F[X]`：

```text
(f+g)(x) = f(x) + g(x)
(lambda f)(x) = lambda f(x)
```

### Polynomial spaces

- `P(R)`：所有 real polynomials；
- `P_n(R)`：degree <= n 的 polynomials。

这些都是 vector spaces，因为多项式相加仍是多项式，scalar multiplication 也仍是多项式。

## 6. 怎么证明一个集合不是 vector space？

要证明“不是”，通常找一条公理失败即可。

例如 half-plane：

```text
H = {(x,y) in R^2 | y >= 0}
```

它对加法可能封闭，但对 scalar multiplication 不封闭，因为如果 `(0,1) in H`，乘 `-1` 得 `(0,-1)`，不在 `H`。

Tutor 提醒：反例比长证明更快。想 disproving 时，不要从 10 条开始查，先找最容易坏的：zero 是否在里面？负数乘会不会跑出去？两个元素相加会不会跑出去？

## 7. Subspace 的定义

如果 `V` 是 field `F` 上的 vector space，`S` 是 `V` 的 subset，那么 `S` 是 subspace if：

- `S` 本身也是 vector space；
- 使用和 `V` 相同的 addition 和 scalar multiplication。

关键必要条件：

- `S` 必须包含 `0_V`；
- 如果 `0_V notin S`，立刻不是 subspace。

## 8. R^3 中的 subspaces

在 `R^3` 中，subspaces 只有这些类型：

- `{0}`；
- `R^3` 本身；
- passing through origin 的 lines；
- passing through origin 的 planes。

不经过 origin 的 line/plane 不是 subspace。

为什么？因为 subspace 必须包含 zero vector。几何上，subspace 必须“穿过原点”。

## 9. Subspace Test Lemma

要证明 `S` 是 `V` 的 subspace，不需要重新验证 10 条。只要证明：

1. `0 in S`；
2. closure under addition：如果 `u,v in S`，则 `u+v in S`；
3. closure under scalar multiplication：如果 `lambda in F` 且 `u in S`，则 `lambda u in S`。

Alternative subspace test：

`S` 是 subspace iff：

- `S` 非空；
- 对任意 `lambda in F` 和 `u,v in S`，有 `lambda u + v in S`。

Tutor 推荐做题模板：

```text
To show S is a subspace:
1. Check zero vector is in S.
2. Let u,v be arbitrary elements of S.
3. Let lambda be arbitrary scalar.
4. Show u+v in S and lambda u in S.
```

或者用 combined version：

```text
Show lambda u + v in S.
```

## 10. Subspace examples

### Example: linear equation through origin

```text
S = {x in R^3 : x1 - 2x2 + 3x3 = 0}
```

Zero check：

```text
0 - 2(0) + 3(0) = 0
```

Closure：

如果 `u` 和 `v` 都满足 equation，那么：

```text
(u1 - 2u2 + 3u3) = 0
(v1 - 2v2 + 3v3) = 0
```

所以 `u+v` 也满足：

```text
(u1+v1) - 2(u2+v2) + 3(u3+v3)
= (u1 - 2u2 + 3u3) + (v1 - 2v2 + 3v3)
= 0
```

Scalar multiplication 也类似：

```text
(lambda u1) - 2(lambda u2) + 3(lambda u3)
= lambda(u1 - 2u2 + 3u3)
= 0
```

所以是 subspace。

### Example: condition not through origin

```text
S = {p in P_2(R) : p(1) = 2}
```

Zero polynomial `p(x)=0` 有 `p(1)=0`，不是 2。

所以 zero 不在 `S`，不是 subspace。

### Example: differential equation family

类似：

```text
S_a = {y in R[R] : dy/dx + 4y = a}
```

如果 `a != 0`，zero function 不满足，所以不是 subspace。

如果 `a = 0`，则通常可以检查 closure，成为 subspace。

## 11. Span 和 linear combination

如果有 vectors `u,v,w`，表达式：

```text
lambda u + mu v + nu w
```

叫做 `u,v,w` 的 linear combination。

由所有 linear combinations 组成的集合：

```text
span{u,v,w} = {lambda u + mu v + nu w | lambda,mu,nu in F}
```

是一个 subspace。

Tutor 直觉：span 就是“这些向量能搭出来的全部地方”。在 `R^3` 里，一个非零向量 span 出一条过原点的线；两个不平行向量 span 出一个过原点的平面；三个合适的向量可能 span 出整个 `R^3`。

## Part B: Calculus

## 12. Functions of Several Variables

很多现实函数依赖不止一个变量。

例子：离原点距离。

```text
1D: d = f(x) = x
2D: d = f(x,y) = sqrt(x^2 + y^2)
3D: d = f(x,y,z) = sqrt(x^2 + y^2 + z^2)
```

几何上：

- `y = f(x)` 是 `R^2` 里的 curve；
- `z = F(x,y)` 是 `R^3` 里的 surface。

多元微积分第一章的核心问题：当一个函数有多个输入时，我们怎么描述它的图像、斜率、近似和变化率？

## 13. Sketching surfaces in R^3

对于 surface：

```text
z = F(x,y)
```

`z` 表示在 `xy-plane` 上方或下方的高度。

要画 surface，可以结合：

- level curves；
- profiles。

## 14. Level curves

Level curve 是：

```text
F(x,y) = C
```

其中 `C` 是常数。

直觉：level curve 是把 surface 在某个高度 `z=C` 切一刀，然后投影到 `xy-plane` 上得到的曲线。

### Example: `z = x^2 + y^2`

Level curves：

```text
x^2 + y^2 = C
```

当 `C > 0` 时，这是圆。`C` 越大，圆半径越大。surface 是向上的 bowl/paraboloid。

Profiles：

- 固定 `y=0`：`z=x^2`；
- 固定 `x=0`：`z=y^2`。

### Example: `z = x^2 - y^2`

Profiles：

- 固定 `y=0`：`z=x^2`，向上 parabola；
- 固定 `x=0`：`z=-y^2`，向下 parabola。

这是 hyperbolic paraboloid，也就是 saddle shape。

Tutor 提醒：画多元函数不要急着想 3D 图。先看 level curves，再看 x/y profiles，surface 会慢慢浮出来。

## 15. Partial Derivatives

如果：

```text
F = F(x,y)
```

partial derivative with respect to `x`：

```text
∂F/∂x = lim_{h->0} [F(x+h,y) - F(x,y)] / h
```

partial derivative with respect to `y`：

```text
∂F/∂y = lim_{h->0} [F(x,y+h) - F(x,y)] / h
```

直觉：

- 求 `∂F/∂x` 时，把 `y` 当常数；
- 求 `∂F/∂y` 时，把 `x` 当常数。

常见记号：

```text
∂F/∂x = F_x = D_1F
∂F/∂y = F_y = D_2F
```

## 16. Partial differentiation rules

和单变量微分规则类似，只是对某个变量微分时，其他变量当常数。

例如：

```text
∂/∂x (F + G) = F_x + G_x
∂/∂x (FG) = F_x G + F G_x
∂/∂x (F/G) = (F_x G - F G_x) / G^2
```

如果 `H = H(y)`，那么对 `x` 微分时，`H(y)` 是常数：

```text
∂/∂x [H(y)F(x,y)] = H(y)F_x(x,y)
```

## 17. Example: partial derivatives

讲义例子：

```text
F(x,y) = e^(y^2) cos(x^2 y) + e^(x^2 y) sin y
```

对 `x` 微分时，`y` 当常数：

```text
F_x = -2xy e^(y^2) sin(x^2 y)
      + 2xy e^(x^2 y) sin y
```

对 `y` 微分时，`x` 当常数：

```text
F_y = 2y e^(y^2) cos(x^2 y)
      - x^2 e^(y^2) sin(x^2 y)
      + x^2 e^(x^2 y) sin y
      + e^(x^2 y) cos y
```

Tutor 做题提醒：

- 先标记“我现在对谁微分”；
- 其他变量先视作 constant；
- product rule 和 chain rule 不要漏；
- 最后再整理。

## 18. Geometrical interpretation

对于 `z = F(x,y)`：

- `F_x(a,b)` 是 surface 在 x-direction 的 slope；
- `F_y(a,b)` 是 surface 在 y-direction 的 slope。

更具体地：

- 固定 `y=b`，得到一条 cross-section curve，`F_x(a,b)` 是这条曲线在 `(a,b)` 附近的 tangent slope；
- 固定 `x=a`，`F_y(a,b)` 是另一个方向的 tangent slope。

## 19. Second-order partial derivatives

一阶偏导还能继续求偏导：

```text
F_xx = ∂/∂x (F_x)
F_yy = ∂/∂y (F_y)
F_yx = ∂/∂x (F_y)
F_xy = ∂/∂y (F_x)
```

注意不同教材记号顺序可能让人困惑，做题时看清定义。

常见定理：

如果 `F` 以及一阶、二阶 partial derivatives 都连续，则：

```text
F_xy = F_yx
```

但不是任何情况下都能交换顺序。讲义给了例子说明在特殊点可能出现 `F_xy(0,0) != F_yx(0,0)`。

## 20. Partial derivatives 不保证 continuity

单变量里，differentiable implies continuous。

多变量中，只知道 partial derivatives 存在，不一定推出函数连续。

讲义例子：

```text
F(x,y) = xy/(x^2+y^2), if (x,y) != (0,0)
F(0,0) = 0
```

在原点：

```text
F_x(0,0) = F_y(0,0) = 0
```

但沿不同方向靠近原点，函数值不趋向同一个 limit，所以不连续。

Tutor 提醒：多元极限最怕“沿不同路径结果不同”。只检查 x-axis 和 y-axis 不够，因为很多坏例子专门在轴上表现正常。

## 21. Tangent Planes and Surface Normals

单变量曲线 `y=f(x)` 在 `(x0,y0)` 的 tangent line：

```text
y = y0 + f'(x0)(x - x0)
```

对应 normal vector：

```text
(f'(x0), -1)
```

多变量 surface：

```text
z = F(x,y)
```

如果点 `(x0,y0,z0)` 在 surface 上，且 tangent plane 存在，则：

```text
z = z0 + F_x(x0,y0)(x-x0) + F_y(x0,y0)(y-y0)
```

normal vector：

```text
(F_x(x0,y0), F_y(x0,y0), -1)
```

为什么？把 surface 参数化：

```text
r = (x, y, F(x,y))
```

两个 tangent vectors：

```text
r_x = (1,0,F_x)
r_y = (0,1,F_y)
```

它们的 cross product 给出 normal direction。

## 22. Tangent plane example

讲义例子：

```text
F(x,y) = -x^2/4 - y^2
```

点：

```text
(2, -1, -2)
```

偏导：

```text
F_x = -x/2, so F_x(2,-1) = -1
F_y = -2y, so F_y(2,-1) = 2
```

Tangent plane：

```text
z = -2 - (x-2) + 2(y+1)
```

Normal vector：

```text
(-1, 2, -1)
```

## 23. Total Differential Approximation

单变量：

```text
f(x) ≈ f(x0) + f'(x0)(x-x0)
```

多变量：

```text
F(x,y) ≈ F(x0,y0)
       + F_x(x0,y0)(x-x0)
       + F_y(x0,y0)(y-y0)
```

如果：

```text
Δx = x - x0
Δy = y - y0
```

则：

```text
ΔF ≈ F_x Δx + F_y Δy
```

几何意义：用 tangent plane 近似 surface 附近的点。

## 24. Error estimate

误差上界常用：

```text
|ΔF| ≈ |F_x Δx + F_y Δy|
     <= |F_x||Δx| + |F_y||Δy|
```

讲义 cone 例子：

```text
V = πr^2h / 3
```

如果 `r=30cm`、`h=10cm`，且每个测量误差不超过 `0.1cm`：

```text
ΔV ≈ V_r Δr + V_h Δh
V_r = 2πrh/3
V_h = πr^2/3
```

误差上界：

```text
|ΔV| <= (2πrh/3)(0.1) + (πr^2/3)(0.1)
     = 50π cm^3
```

## 25. Chain Rule: one parameter

如果：

```text
F = F(x,y)
x = x(t)
y = y(t)
```

那么：

```text
dF/dt = F_x dx/dt + F_y dy/dt
```

直觉：`t` 改变会导致 `x` 改变，也会导致 `y` 改变；`F` 的总变化是两个通道贡献的和。

Tutor 记忆法：

```text
dF/dt = sum over paths from F to t
```

从 `F` 到 `t` 有两条路：

```text
F -> x -> t
F -> y -> t
```

所以加起来。

## 26. Chain Rule: two parameters

如果：

```text
F = F(x,y)
x = x(s,t)
y = y(s,t)
```

则：

```text
∂F/∂t = F_x ∂x/∂t + F_y ∂y/∂t
∂F/∂s = F_x ∂x/∂s + F_y ∂y/∂s
```

求 `∂F/∂t` 时 hold `s` fixed；求 `∂F/∂s` 时 hold `t` fixed。

## 27. Chain Rule: one intermediate variable

如果：

```text
F = F(u)
u = u(x,y)
```

则：

```text
∂F/∂x = dF/du * ∂u/∂x
∂F/∂y = dF/du * ∂u/∂y
```

这就是 ordinary chain rule 在多变量里的版本。

## 28. Functions of three variables

如果：

```text
F = F(x,y,z)
```

则：

```text
F_x = ∂F/∂x
F_y = ∂F/∂y
F_z = ∂F/∂z
```

求某一个 partial derivative 时，另外两个变量保持 fixed。

Total differential approximation：

```text
ΔF ≈ F_x Δx + F_y Δy + F_z Δz
```

如果：

```text
w = F(x,y,z)
```

在 `R^4` 中的 tangent hyperplane：

```text
w = w0
  + F_x(x0,y0,z0)(x-x0)
  + F_y(x0,y0,z0)(y-y0)
  + F_z(x0,y0,z0)(z-z0)
```

## 29. Chain Rule: three variables depending on two parameters

如果：

```text
F = F(x,y,z)
x = x(u,v)
y = y(u,v)
z = z(u,v)
```

那么例如：

```text
∂F/∂u = F_x ∂x/∂u + F_y ∂y/∂u + F_z ∂z/∂u
```

求 `∂F/∂u` 时 hold `v` fixed。

## 30. 本周做题 checklist

### Algebra: prove subspace

看到“prove S is a subspace”：

1. 明确 ambient vector space 是什么；
2. 检查 zero 是否在 `S`；
3. 取 arbitrary `u,v in S`；
4. 取 arbitrary scalar `lambda`；
5. 证明 `u+v in S` 和 `lambda u in S`，或直接证明 `lambda u + v in S`。

看到“disprove subspace”：

1. 先查 zero；
2. 再试 scalar multiplication，特别是乘 `-1`；
3. 再试 addition；
4. 找一个具体 counterexample。

### Calculus: partial derivatives

1. 明确对哪个变量微分；
2. 其他变量当常数；
3. 使用 product/quotient/chain rule；
4. 二阶偏导注意顺序；
5. 不要随便假设 `F_xy = F_yx`，除非连续性条件满足或题目允许。

### Calculus: tangent plane

模板：

```text
1. Check z0 = F(x0,y0)
2. Compute F_x and F_y
3. Evaluate F_x(x0,y0), F_y(x0,y0)
4. Substitute:
   z = z0 + F_x(x0,y0)(x-x0) + F_y(x0,y0)(y-y0)
```

### Calculus: chain rule

画 dependency tree：

```text
F
|\
x y
 \|
  t
```

然后把每条 path 的 derivatives 相乘，再把 paths 加起来。

## 31. Big picture

Algebra 这周是在抽象：不管对象是向量、矩阵、函数还是多项式，只要满足相同结构，就能用同一套理论处理。

Calculus 这周是在推广：单变量的 slope、tangent line、linear approximation 和 chain rule，都可以推广到多变量，只是要清楚“哪个变量在变，哪个变量先固定”。

Tutor 最后会强调：MATH1241 的难点不是公式多，而是每次都要知道自己所在的结构。代数问“这个集合在什么运算下封闭？”微积分问“这个函数依赖哪些变量？”把这两个问题问清楚，题目会规整很多。
