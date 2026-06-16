# MATH1241 Algebra 知识点详细总结

这份不是刷行数版，也不是“做题模板大全”。

它的目标是直接讲清楚 MATH1241 Algebra notes 里面的知识点：每个概念在干什么，为什么要定义它，它和前后内容有什么关系。

来源对应：

- `MATH1231-1241-Algebra-Notes-2020T1.pdf`
- Chapter 6: Vector Spaces
- Chapter 7: Linear Transformations
- Chapter 8: Eigenvalues and Eigenvectors
- Chapter 9: Introduction to Probability and Statistics

## 1. Algebra 这本书的整体结构

这本 Algebra notes 的名字容易误导人。它不只是“矩阵计算”。

它实际上分成两条线：

第一条是线性代数：

```text
vector spaces
subspaces
span
linear independence
basis
dimension
linear transformations
kernel
image
rank-nullity
eigenvalues
eigenvectors
diagonalisation
```

第二条是概率统计入门：

```text
sets
probability
conditional probability
independence
random variables
mean
variance
binomial distribution
geometric distribution
continuous random variables
normal distribution
```

这两条线看起来不一样，但课程想训练的是同一种数学能力：

```text
从具体例子里抽象出结构。
```

在线代里，你把箭头、矩阵、多项式、函数都看成 vector。

在概率里，你把随机现象整理成 sample space、events、random variables 和 distributions。

所以这本书的核心不是“会算”，而是：

```text
一个对象属于什么结构？
这个结构允许什么操作？
哪些性质是由结构本身保证的？
```

## 2. Revision：为什么先复习 lines、planes、dot product

Algebra notes 在 Chapter 6 前复习了 MATH1131/1141 的内容：

```text
lines in R^n
planes in R^n
dot product
cross product
orthogonality
projection
point-normal form
```

这不是随便放的。

因为 Chapter 6 开始讲 abstract vector spaces，一上来会很抽象。复习这些几何内容，是为了让你有直觉支撑。

比如：

```text
R^3 里过原点的一条直线是 subspace。
R^3 里过原点的一个平面是 subspace。
不过原点的直线和平面不是 subspace。
```

为什么？

因为 vector space 必须有 zero vector。

这说明抽象定义不是凭空来的，它来自你熟悉的几何例子。

dot product 的作用也很大。

它让你能定义：

```text
length
angle
orthogonality
projection
```

这些在后面的 geometric linear transformations、projection、eigenvector 直觉中都会反复出现。

## 3. Chapter 6: Vector Spaces

Chapter 6 是整本线性代数部分的地基。

它的问题是：

```text
什么东西可以被当成 vector？
```

以前你可能觉得 vector 就是：

```text
(1, 2)
(3, 4, 5)
一个箭头
```

但这章告诉你：

```text
矩阵可以是 vector。
多项式可以是 vector。
函数可以是 vector。
```

关键不是对象长什么样，而是它能不能做两件事：

```text
相加
被 scalar 乘
```

并且这些操作满足向量空间公理。

## 4. Field：scalar 的来源

Vector space 一定是 over a field。

Field 可以先理解成：

```text
你允许拿来乘 vector 的数字系统。
```

常见 fields：

```text
R: real numbers
C: complex numbers
Q: rational numbers
F_p: modulo prime p 的有限域
```

为什么要讲 field？

因为 vector space 里有 scalar multiplication。

比如：

```text
λv
```

这里的 `λ` 必须来自某个 field。

在大多数 MATH1241 题里，你可以先把 field 想成 `R`。但概念上要知道：vector space 的结构依赖于 scalar 来自哪里。

## 5. Vector Space：定义的真正意思

一个 vector space 是一个集合 `V`，带有：

```text
vector addition
scalar multiplication
```

并满足一组公理。

这些公理看起来很多，但它们核心在保证：

```text
线性运算是稳定的。
```

稳定是什么意思？

如果 `u` 和 `v` 在 `V` 里，那么：

```text
u + v
```

也必须还在 `V` 里。

如果 `v` 在 `V` 里，`λ` 是 scalar，那么：

```text
λv
```

也必须还在 `V` 里。

这叫 closure。

没有 closure，就没法在这个集合里稳定地做线性代数。

## 6. Vector Space 的例子

最标准的例子是：

```text
R^n
```

也就是所有 n-tuples。

但更重要的是这些：

```text
M_{m,n}(R): 所有 m by n matrices
P_n(R): degree <= n 的多项式
F(X, R): 从集合 X 到 R 的函数
```

为什么矩阵可以是 vector？

因为矩阵可以相加，也可以乘 scalar：

```text
A + B
λA
```

结果仍然是同样大小的矩阵。

为什么多项式可以是 vector？

因为多项式相加还是多项式，乘 scalar 还是多项式。

注意这里通常是：

```text
degree <= n
```

而不是：

```text
degree exactly n
```

因为两个 degree exactly n 的多项式相加可能最高次项抵消，degree 会变小。

所以 `degree exactly n` 的多项式集合通常不是 vector space。

## 7. Zero Vector：不一定长得像数字 0

每个 vector space 都有自己的 zero vector。

在 `R^n` 里：

```text
(0, 0, ..., 0)
```

在 matrix space 里：

```text
zero matrix
```

在 polynomial space 里：

```text
zero polynomial
```

在 function space 里：

```text
zero function
```

这点很重要。

很多同学看到函数空间会忘记：

```text
zero vector 是一个函数，不是一个数字。
```

它是：

```text
f(x) = 0 for all x
```

## 8. Subspace：大空间里仍然完整的小空间

如果 `V` 是 vector space，`S` 是 `V` 的 subset，那么 `S` 是 subspace 的意思是：

```text
S 自己也能成为 vector space，并且使用 V 里的同样加法和数乘。
```

Subspace 的判断核心是三件事：

```text
0 in S
u, v in S => u + v in S
λ in F, u in S => λu in S
```

中文直觉：

```text
有零
加不跑
乘不跑
```

这三个条件很短，但非常深。

它们保证你待在 `S` 里面做线性组合时不会跑出去。

也就是说，如果 `S` 是 subspace，那么：

```text
c1v1 + c2v2 + ... + ckvk
```

只要 `v1,...,vk` 都在 `S` 里，结果还在 `S` 里。

## 9. Subspace 的几何直觉

在 `R^2` 中，subspace 只有：

```text
{0}
过原点的直线
R^2
```

在 `R^3` 中，subspace 只有：

```text
{0}
过原点的直线
过原点的平面
R^3
```

“过原点”不是装饰条件。

因为 subspace 必须包含 zero vector。

所以：

```text
x + y = 0
```

对应过原点的直线，可能是 subspace。

但：

```text
x + y = 1
```

不过原点，不是 subspace。

这就是 homogeneous 和 non-homogeneous 的区别。

## 10. Linear Combination：线性代数最核心的动作

给定 vectors：

```text
v1, v2, ..., vk
```

它们的 linear combination 是：

```text
c1v1 + c2v2 + ... + ckvk
```

这里 `c1,...,ck` 是 scalars。

这件事是整本线性代数的核心动作。

后面的所有概念几乎都围绕 linear combination：

```text
span = 所有 linear combinations
linear independence = zero vector 的 linear combination 是否唯一
basis = 每个 vector 都能唯一写成 linear combination
coordinates = linear combination 的 coefficients
```

所以 linear combination 不是小定义，而是线代语言的基本句子。

## 11. Span：一组 vectors 能生成的世界

`span{v1,...,vk}` 是所有 linear combinations 的集合：

```text
span{v1,...,vk} = {c1v1 + ... + ckvk}
```

直觉：

```text
这些 vectors 能通过线性组合扫出来的全部区域。
```

在 `R^3` 里：

一个非零 vector 的 span 是：

```text
过原点的一条直线
```

两个不平行 vectors 的 span 是：

```text
过原点的一个平面
```

三个合适 vectors 的 span 可以是：

```text
整个 R^3
```

Span 总是 subspace。

这是因为 linear combinations 对加法和数乘天然封闭。

## 12. Span 和 matrix equation 的关系

如果你问：

```text
b 是否在 span{v1, v2, v3} 里？
```

其实就是在问：

```text
c1v1 + c2v2 + c3v3 = b
```

有没有解。

把 `v1,v2,v3` 放成 matrix 的 columns：

```text
A = [v1 v2 v3]
```

那么问题变成：

```text
Ac = b
```

所以：

```text
b in span(columns of A)
```

等价于：

```text
Ax = b is consistent
```

这就是 span 和 linear systems 的连接。

## 13. Linear Independence：没有多余信息

一组 vectors `v1,...,vk` linearly independent 的意思是：

```text
c1v1 + ... + ckvk = 0
```

只有一个解：

```text
c1 = c2 = ... = ck = 0
```

如果存在不全为 0 的 coefficients 也能组合出 0，那么它们 dependent。

直觉：

```text
dependent = 至少有一个 vector 可以由其他 vectors 组合出来。
independent = 没有 vector 是多余的。
```

例如：

```text
v3 = 2v1 - v2
```

那么 `v1,v2,v3` 一定 dependent。

因为 `v3` 没有带来新方向。

## 14. Linear Independence 和唯一表示

Linear independence 还有一个很重要的意义：

```text
线性组合的表示是唯一的。
```

如果一组 vectors independent，那么同一个 vector 不可能用两套不同 coefficients 表示。

这就是 coordinates 能成立的原因。

如果 basis 不是 independent，那么同一个 vector 可能有很多种写法。

这会让“坐标”失去意义。

## 15. Basis：刚好够用的一组 vectors

Basis 是两个条件合在一起：

```text
spanning
linear independence
```

Spanning 表示：

```text
够用，能生成整个空间。
```

Linear independence 表示：

```text
不浪费，没有冗余。
```

所以 basis 的人话是：

```text
刚好够用的一套生成器。
```

比如 `R^3` 的 standard basis：

```text
e1 = (1,0,0)
e2 = (0,1,0)
e3 = (0,0,1)
```

任何 `(x,y,z)` 都能唯一写成：

```text
xe1 + ye2 + ze3
```

这就是 basis 的意义。

## 16. Dimension：空间有多少自由方向

Dimension 是 basis 里 vectors 的个数。

它衡量的是：

```text
这个空间有多少独立自由方向。
```

例子：

```text
dim(R^n) = n
dim(P_n(R)) = n + 1
dim(M_{m,n}(R)) = mn
```

为什么 `P_n(R)` 的 dimension 是 `n+1`？

因为 basis 是：

```text
1, x, x^2, ..., x^n
```

一共有 `n+1` 个。

为什么 `M_{m,n}(R)` 的 dimension 是 `mn`？

因为矩阵里每个 entry 都是一个独立自由度。

## 17. Coordinates：vector 相对 basis 的描述

如果 `B = {b1,...,bn}` 是 basis，那么每个 vector `v` 都可以唯一写成：

```text
v = c1b1 + ... + cnbn
```

于是：

```text
[v]_B = (c1,...,cn)^T
```

这叫 `v` relative to basis `B` 的 coordinate vector。

重点：

```text
vector 没变，坐标变了。
```

就像同一个地点可以用不同地图坐标描述。

在 standard basis 下，`(2,3)` 就是 `(2,3)`。

但在另一个 basis 下，它可能坐标是 `(5,-1)`。

## 18. Chapter 7: Linear Transformations

Chapter 7 从“空间本身”转向“空间之间的函数”。

问题变成：

```text
什么样的函数尊重线性结构？
```

答案是 linear transformation。

一个 map `T: V -> W` 是 linear，如果：

```text
T(u+v) = T(u) + T(v)
T(λu) = λT(u)
```

也就是说：

```text
先组合再映射
```

和：

```text
先映射再组合
```

结果一样。

这叫保持线性结构。

## 19. Linear Map 的直觉

Linear map 不会破坏 linear combinations。

如果：

```text
v = c1v1 + c2v2
```

那么：

```text
T(v) = c1T(v1) + c2T(v2)
```

这意味着：

```text
只要知道 T 对 basis vectors 做了什么，
就知道 T 对整个空间做了什么。
```

这是 linear map 非常强的地方。

## 20. Matrix 是 Linear Map 的坐标表示

从 `R^n` 到 `R^m` 的 linear map 都可以写成：

```text
T(x) = Ax
```

其中 `A` 是 `m x n` matrix。

Matrix 的每一列是什么？

```text
第 i 列 = T(e_i)
```

所以 matrix 不是和 linear map 分开的东西。

它只是：

```text
linear map 在 standard basis 下的记录表。
```

这句话非常重要。

## 21. Geometric Linear Transformations

很多 matrix 都有几何意义：

```text
rotation
reflection
projection
scaling
shear
```

比如 projection 把所有 vectors 压到某条线或某个平面上。

Reflection 保持镜面上的方向不变，把垂直方向翻过去。

Rotation 改变方向但保持长度。

Scaling 改变长度但可能保持方向。

这些几何动作都可以被 matrix 表示，只要它们是 linear。

## 22. Kernel：被压成 0 的部分

对 linear map `T: V -> W`：

```text
ker(T) = {v in V : T(v) = 0}
```

Kernel 是 domain 里的 subspace。

直觉：

```text
kernel 是被 T 完全压扁掉的方向。
```

如果 `T(x)=Ax`，那么：

```text
ker(T)
```

就是：

```text
Ax = 0
```

的 solution space。

Kernel 和 one-to-one 有直接关系：

```text
T is one-to-one iff ker(T) = {0}
```

因为如果非零 vector 被送到 0，就说明两个不同输入可能有同一个输出。

## 23. Image：能到达的输出空间

Image 定义：

```text
im(T) = {T(v) : v in V}
```

Image 是 codomain `W` 的 subspace。

直觉：

```text
T 实际能到达的所有输出。
```

如果 `T(x)=Ax`，image 就是：

```text
column space of A
```

也就是 matrix columns 的 span。

Image 和 onto 有直接关系：

```text
T is onto W iff im(T) = W
```

## 24. Rank 和 Nullity

Rank 是 image 的 dimension：

```text
rank(T) = dim(im(T))
```

Nullity 是 kernel 的 dimension：

```text
nullity(T) = dim(ker(T))
```

Rank-nullity theorem：

```text
rank(T) + nullity(T) = dim(V)
```

这里 `V` 是 domain。

这条定理的直觉是：

```text
输入空间的自由度，一部分被压没了，一部分活成输出。
```

Kernel 里的自由度是被压没的。

Image 的自由度是保留下来的。

两者加起来等于原来 domain 的自由度。

## 25. One-to-one、Onto、Invertible

对函数：

```text
one-to-one
```

意思是不同 input 不会给同一个 output。

```text
onto
```

意思是 codomain 中每个元素都真的能被打到。

```text
invertible
```

意思是既 one-to-one 又 onto。

在线性代数里：

```text
one-to-one <-> ker(T) = {0}
onto <-> im(T) = W
```

如果是有限维同维空间的 linear map，很多条件会等价：

```text
one-to-one
onto
invertible
full rank
trivial kernel
```

这些其实都是在说：

```text
这个线性变换没有丢失自由度。
```

## 26. Chapter 8: Eigenvalues and Eigenvectors

Chapter 8 研究的是 linear transformation 中最稳定的方向。

定义：

```text
Av = λv
```

其中：

```text
v != 0
```

则 `v` 是 eigenvector，`λ` 是 eigenvalue。

人话：

```text
eigenvector 是被 A 作用后方向不变的 vector。
eigenvalue 是这个方向上的缩放倍数。
```

如果 `λ = 2`，表示这个方向被拉长 2 倍。

如果 `λ = -1`，表示这个方向被翻转。

如果 `λ = 0`，表示这个方向被压成 0。

## 27. 为什么 Eigenvector 重要

一般 matrix 作用在 vector 上，会改变方向。

但 eigenvector 很特殊：

```text
A 作用后只改变长度或方向正负，不改变所在直线。
```

所以 eigenvectors 揭示了 linear transformation 的内在结构。

如果一个空间有一组 basis 全部由 eigenvectors 组成，那么这个 transformation 在这组 basis 下就非常简单：

```text
每个坐标方向只是单独缩放。
```

这就是 diagonalisation 的核心。

## 28. Characteristic Equation

从：

```text
Av = λv
```

移项：

```text
(A - λI)v = 0
```

因为 `v` 不能是 zero vector，所以这个 homogeneous system 必须有 nontrivial solution。

这发生当且仅当：

```text
det(A - λI) = 0
```

这就是 characteristic equation。

解它得到 eigenvalues。

然后对每个 eigenvalue，解：

```text
(A - λI)v = 0
```

得到 eigenspace。

## 29. Diagonalisation

如果 `A` 有足够多 linearly independent eigenvectors，那么：

```text
A = PDP^{-1}
```

其中：

```text
P 的 columns 是 eigenvectors
D 的 diagonal entries 是对应 eigenvalues
```

这表示：

```text
A 在 eigenbasis 下就是 diagonal matrix。
```

Diagonal matrix 很简单，因为它只做各坐标方向的独立缩放。

Diagonalisation 的实际意义：

```text
A^n = PD^nP^{-1}
```

而 `D^n` 很容易算。

所以 eigenvalues/eigenvectors 不只是定义，它们让复杂 matrix powers 和 dynamic systems 变简单。

## 30. Chapter 9: Probability and Statistics

Chapter 9 从线性代数切换到概率统计。

它研究的是：

```text
随机事件如何量化？
随机变量如何描述？
分布如何表达随机行为？
平均值和方差代表什么？
```

概率统计的基本对象不是 vector，而是：

```text
sample space
events
probability function
random variables
distributions
```

## 31. Set Theory in Probability

Probability 用集合语言描述事件。

Sample space：

```text
Ω
```

表示所有可能结果。

Event：

```text
A subset Ω
```

表示某些结果组成的集合。

基本集合操作：

```text
A ∪ B: A or B
A ∩ B: A and B
A^c: not A
```

Disjoint events：

```text
A ∩ B = empty
```

意思是两个事件不能同时发生。

## 32. Probability Axioms

Probability function `P` 给每个 event 一个数。

核心规则：

```text
P(A) >= 0
P(Ω) = 1
如果 A 和 B disjoint，则 P(A ∪ B) = P(A) + P(B)
```

由这些可以推出：

```text
P(A^c) = 1 - P(A)
P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
```

概率不是随便算的，它是建立在集合结构上的 measure。

## 33. Conditional Probability

Conditional probability：

```text
P(A | B) = P(A ∩ B) / P(B)
```

意思是：

```text
已知 B 发生后，A 发生的概率。
```

条件概率的重点是：

```text
sample space 被缩小到了 B。
```

所以 `P(A|B)` 和 `P(B|A)` 通常不同。

这是非常常见的混淆点。

## 34. Independence

两个事件 independent，意思是：

```text
一个事件发生不会改变另一个事件的概率。
```

公式：

```text
P(A ∩ B) = P(A)P(B)
```

等价地：

```text
P(A|B) = P(A)
```

如果 `P(B) > 0`。

注意：

```text
independent 不等于 disjoint。
```

Disjoint 是不能同时发生。

Independent 是互不影响。

如果两个非空事件 disjoint，它们通常不是 independent，因为一个发生会让另一个发生概率变成 0。

## 35. Random Variables

Random variable 是从 sample space 到 numbers 的函数。

它不是“随机变化的变量”这么简单。

更准确地说：

```text
X: Ω -> R
```

它把每个 outcome 转成一个数字。

例如掷两次骰子：

```text
X = 两次点数之和
```

那么 `X` 的可能值是：

```text
2,3,...,12
```

我们关心的是：

```text
P(X = x)
```

这就是 distribution。

## 36. Mean 和 Variance

Expected value：

```text
E(X) = sum x P(X=x)
```

它是长期平均值。

Variance：

```text
Var(X) = E((X - E(X))^2)
```

也常写成：

```text
Var(X) = E(X^2) - [E(X)]^2
```

Mean 描述中心。

Variance 描述波动。

如果 variance 大，说明结果更分散。

如果 variance 小，说明结果更集中。

## 37. Binomial Distribution

Binomial distribution 描述：

```text
n 次独立重复试验中成功次数。
```

条件：

```text
固定 n
每次只有 success/failure
每次 success probability 都是 p
各次试验 independent
```

记作：

```text
X ~ Bin(n,p)
```

公式：

```text
P(X=k) = C(n,k) p^k (1-p)^(n-k)
```

Mean 和 variance：

```text
E(X) = np
Var(X) = np(1-p)
```

## 38. Geometric Distribution

Geometric distribution 描述：

```text
第一次成功出现在第几次试验。
```

如果每次成功概率是 `p`，那么：

```text
P(X=k) = (1-p)^(k-1)p
```

意思是：

```text
前 k-1 次失败，第 k 次成功。
```

它和 binomial 的区别：

Binomial：

```text
固定试验次数，数成功次数。
```

Geometric：

```text
固定目标是第一次成功，数等了多久。
```

## 39. Continuous Random Variables

连续型随机变量不用 `P(X=x)` 描述单点概率。

因为通常：

```text
P(X=x) = 0
```

它用 density function `f(x)` 描述。

性质：

```text
f(x) >= 0
∫ f(x) dx = 1
P(a <= X <= b) = ∫_a^b f(x) dx
```

这里概率是面积。

Mean：

```text
E(X) = ∫ x f(x) dx
```

Variance：

```text
Var(X) = E(X^2) - [E(X)]^2
```

## 40. Normal Distribution

Normal distribution 是最重要的连续分布。

它的形状是 bell curve。

由两个参数决定：

```text
mean μ
standard deviation σ
```

标准化：

```text
Z = (X - μ) / σ
```

把一般 normal variable 转成 standard normal。

Normal distribution 的直觉：

```text
很多小随机因素加在一起时，结果常常近似 normal。
```

## 41. Algebra 全书知识关系图

线性代数部分：

```text
vector space
  -> subspace
  -> span
  -> linear independence
  -> basis
  -> dimension
  -> coordinates
  -> linear transformation
  -> kernel/image
  -> rank-nullity
  -> eigenvectors/eigenvalues
  -> diagonalisation
```

概率部分：

```text
sample space
  -> events
  -> probability
  -> conditional probability
  -> independence
  -> random variables
  -> distributions
  -> mean/variance
  -> special distributions
```

它们共同的学习方式是：

```text
先定义对象
再定义操作
再研究结构性质
```

## 42. Algebra 最重要的概念总结

如果只抓最核心的东西，Algebra 要抓这些：

```text
subspace 是能自己封闭做线性运算的小空间。
span 是一组 vectors 能生成的所有东西。
linear independence 是没有冗余。
basis 是既够用又不冗余。
dimension 是独立自由度数量。
linear map 是保持线性组合的函数。
kernel 是被压成 0 的方向。
image 是能到达的输出空间。
rank-nullity 是自由度守恒。
eigenvector 是方向不变的 vector。
diagonalisation 是换到 eigenbasis 后把变换简化。
probability 是事件集合上的 measure。
random variable 是把 outcome 变成数字的函数。
distribution 描述 random variable 的概率结构。
mean 是中心，variance 是波动。
```

