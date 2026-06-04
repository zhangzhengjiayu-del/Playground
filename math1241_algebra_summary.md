# MATH1241 Algebra 全书详细总结

> 依据：
>
> - [MATH1231-1241-Algebra-Notes-2020T1.pdf](/Users/apple/Desktop/📖/正学/1241%20algebra/MATH1231-1241-Algebra-Notes-2020T1.pdf)
>
> 这份总结按这本 Algebra notes 的全书结构整理，而不是只挑线性代数的一部分。
>
> 全书主线：
>
> ```text
> Chapter 6: Vector spaces
> Chapter 7: Linear transformations
> Chapter 8: Eigenvalues and eigenvectors
> Chapter 9: Introduction to probability and statistics
> ```

## 1. 这本 Algebra notes 到底在讲什么

这本书虽然叫 Algebra notes，但它实际上有两大块：

```text
线性代数
概率统计入门
```

前半本的主线是：

```text
vector spaces
-> subspaces
-> span / linear independence
-> basis / dimension
-> linear maps
-> kernel / image / rank-nullity
-> eigenvalues / eigenvectors / diagonalisation
```

后半本 Chapter 9 则转到：

```text
probability
random variables
distributions
mean / variance
normal distribution
```

所以这本书真正想训练你的，不是“会不会算矩阵”这么简单，而是两类结构化思维：

```text
1. 线性结构：空间、变换、基、特征方向
2. 随机结构：事件、概率、分布、平均行为
```

一句话总结全书：

```text
这本 notes 在训练你用抽象结构去描述“确定性关系”和“随机性规律”。
```

## 2. Revision 在提醒什么

在正式进入 Chapter 6 之前，notes 特意提醒你复习 MATH1131/1141 的基础：

```text
lines and planes
dot product
cross product
orthogonality
projection
point-normal form of a plane
```

这说明一件很重要的事：

```text
1241 的 algebra 不是凭空出现的抽象理论，
它是从 R^n 里的几何直觉慢慢推广上去的。
```

所以如果你后面觉得 vector space 太抽象，记得回到：

```text
line through origin
plane through origin
dot product
projection
matrix equation
```

这些具体例子上来理解。

## 3. Chapter 6 总览：Vector Spaces

Chapter 6 的目录大致是：

```text
6.1 Definitions and examples of vector spaces
6.2 Vector arithmetic
6.3 Subspaces
6.4 Linear combinations and spans
6.5 Linear independence
6.6 Basis and dimension
6.7 [X] Coordinate vectors
6.8 [X] Further important examples of vector spaces
6.9 Set and function notation review
```

这一章是整本线代部分的地基。

核心问题：

```text
什么东西可以像“向量”那样做线性运算？
```

### 3.1 Vector spaces：定义和直觉

Vector space 的核心不是外形，而是规则。

只要一个集合上的对象可以做：

```text
addition
scalar multiplication
```

并满足相应公理，它就可以是 vector space。

所以 vector 不一定非得是箭头，也可以是：

```text
matrices
functions
polynomials
n-tuples
```

你要把“向量”理解成：

```text
满足线性规则的对象。
```

标准例子：

```text
R^n
M_{m,n}(R)
polynomial spaces
function spaces
```

### 3.2 Vector arithmetic

这一节本质上在说：

```text
既然你把对象叫 vector，就必须能稳定做加法和数乘。
```

相关基本性质包括：

```text
zero vector
negative vector
closure
distributive laws
```

这些不是纯形式主义，而是为了保证后面：

```text
linear combination
span
independence
```

这些概念有意义。

### 3.3 Subspaces

Subspace 是最常考的判断题来源。

人话：

```text
大空间里面的一小块，但这小块自己也必须是 vector space。
```

最重要的检查就是：

```text
1. 0 in S
2. u,v in S -> u+v in S
3. λ in F, u in S -> λu in S
```

记成一句：

```text
有零、加不跑、乘不跑。
```

几何上：

```text
R^2 的 subspace 是原点、过原点的直线、整个 R^2
R^3 的 subspace 是原点、过原点的直线、过原点的平面、整个 R^3
```

不过原点的直线/平面都不是 subspace。

### 3.4 Linear combinations and spans

给 vectors `v1,...,vk`，linear combination 是：

```text
c1v1 + ... + ckvk
```

Span 是所有这种组合的集合：

```text
span{v1,...,vk}
```

直觉：

```text
这组 vectors 能“生成”的全部东西。
```

在 `R^m` 里，关于 span 的问题通常会变成：

```text
Ax = b 是否有解？
```

因为：

```text
[v1 ... vk]c = b
```

就是在问 `b` 能不能写成这些 columns 的线性组合。

### 3.5 Linear independence

`v1,...,vk` linearly independent 意思是：

```text
c1v1 + ... + ckvk = 0
```

只有 trivial solution：

```text
c1 = ... = ck = 0
```

如果存在 nontrivial solution，则 dependent。

直觉：

```text
independent = 没有多余向量
dependent = 至少一个向量可由其他向量拼出来
```

notes 还特别强调：

```text
uniqueness 和 linear independence 的关系
span 和 linear independence 的关系
```

这两个关系正是 basis 的前奏。

### 3.6 Basis and dimension

Basis 定义：

```text
既 spanning，又 linearly independent。
```

也就是说：

```text
既够用，又不浪费。
```

Dimension 是 basis 里 vectors 的数目。

例如：

```text
dim(R^n) = n
```

如果你已经知道某空间 dimension 是 `n`，那么：

```text
n 个 independent vectors automatically form a basis
n 个 spanning vectors automatically form a basis
```

这类结论非常常考，也非常省事。

### 3.7 Coordinate vectors [X]

这是 1241 内容。

如果 `B = {b1,...,bn}` 是 basis，那么任意 `v` 都能唯一写成：

```text
v = c1b1 + ... + cnbn
```

于是：

```text
[v]_B = (c1,...,cn)^T
```

坐标向量的重点是：

```text
vector 本身没变，只是表示它的“尺子”变了。
```

### 3.8 Further examples [X]

这一节是在帮你真正接受：

```text
vector 不只是一列数字。
```

matrices、functions、polynomials 都可以形成 vector spaces。

这是整个抽象线代最重要的观念转折点。

## 4. Chapter 6 做题模板

判断 subspace：

```text
check zero
check addition closure
check scalar closure
```

判断某向量是否在 span 里：

```text
set up linear system
solve for coefficients
```

判断 independence：

```text
solve c1v1 + ... + ckvk = 0
```

找 basis：

```text
找一组既 spans 又 independent 的向量
```

找 dimension：

```text
数 basis 里的元素个数
```

## 5. Chapter 7 总览：Linear Transformations

Chapter 7 的目录大致是：

```text
7.1 Introduction to linear maps
7.2 Linear maps from R^n to R^m and matrices
7.3 Geometric examples
7.4 Subspaces associated with linear maps
7.5 Further applications
7.6 [X] Representation by matrices
7.7 [X] Matrix arithmetic and linear maps
7.8 [X] One-to-one, onto, invertible
7.9 [X] Proof of rank-nullity
7.10 One-to-one, onto and inverses for functions
```

这一章的核心问题：

```text
什么样的函数能保持线性结构？
```

### 5.1 Linear maps

`T: V -> W` linear iff：

```text
T(u+v) = T(u) + T(v)
T(λu) = λT(u)
```

直觉：

```text
线性映射不会把线性组合“掰弯”。
```

重要推论：

```text
T(0)=0
T(c1v1 + ... + ckvk) = c1T(v1)+...+ckT(vk)
```

如果一个映射不把 `0` 映到 `0`，它立刻不是 linear。

### 5.2 Maps from R^n to R^m and matrices

这是最重要的桥梁：

```text
every linear map from R^n to R^m can be represented by a matrix
```

也就是：

```text
T(x) = Ax
```

matrix 的第 `i` 列就是：

```text
T(e_i)
```

所以矩阵不是独立于线性映射的另一样东西；

它只是：

```text
linear map 在标准基下的坐标表示。
```

### 5.3 Geometric examples

这一节通常会出现：

```text
reflection
rotation
projection
scaling
shear
```

目的不是炫图形，而是让你理解：

```text
linear transformation 不只是代数公式，
它也有几何动作。
```

### 5.4 Kernel and image

Kernel：

```text
ker(T) = {v in V : T(v)=0}
```

Image：

```text
im(T) = {T(v) : v in V}
```

直觉：

```text
kernel = 被压扁掉的方向
image = 真正能到达的输出区域
```

两者都是 subspaces：

```text
ker(T) subset of V
im(T) subset of W
```

矩阵语言里：

```text
ker(T) = null space of A
im(T) = column space of A
```

### 5.5 Rank and nullity

Rank：

```text
dim(im(T))
```

Nullity：

```text
dim(ker(T))
```

最重要的定理：

```text
rank(T) + nullity(T) = dim(V)
```

这就是 rank-nullity theorem。

直觉：

```text
输入空间的自由度，
一部分被压进 kernel，
一部分活成 image。
```

### 5.6 One-to-one, onto, invertible [X]

这是 1241 更深入的部分。

关键联系：

```text
T one-to-one  <-> ker(T) = {0}
T onto        <-> im(T) = W
T invertible  <-> one-to-one and onto
```

如果 `V` 和 `W` 维数相同，这些条件之间还会出现更多等价关系。

### 5.7 Functions vs linear maps

notes 特别放了一节讨论 one-to-one、onto、inverse for functions。

原因是：

```text
线性映射只是函数的一种特殊类型。
```

你必须先理解一般函数里的：

```text
injective
surjective
bijective
inverse
```

再把这些概念带回线性世界里。

## 6. Chapter 7 做题模板

判断 linear：

```text
test additivity and scalar property
or show T(x)=Ax style
```

找 matrix：

```text
compute T(e1), ..., T(en)
put them as columns
```

找 kernel：

```text
solve Ax = 0
```

找 image/rank：

```text
find column space
count pivots
```

判断 one-to-one / onto：

```text
one-to-one -> kernel trivial
onto -> image equals codomain
```

## 7. Chapter 8 总览：Eigenvalues and Eigenvectors

Chapter 8 的目录大致是：

```text
8.1 Definitions and examples
8.2 Eigenvectors, bases, and diagonalisation
8.3 Applications
```

这是线代部分最有“结构味道”的一章。

核心问题：

```text
有没有某些方向在变换下只被拉伸/翻转，而不改变方向？
```

### 7.1 Eigenvalues and eigenvectors

定义：

```text
Av = λv
```

其中：

```text
v != 0
```

则 `v` 是 eigenvector，`λ` 是 eigenvalue。

直觉：

```text
eigenvector 是不转向的特殊方向；
eigenvalue 是沿这个方向的缩放因子。
```

### 7.2 Finding eigenvalues

从：

```text
Av = λv
```

变成：

```text
(A - λI)v = 0
```

为了有 nonzero solution，必须：

```text
det(A - λI) = 0
```

这给出 characteristic equation。

解出 `λ` 后，再解：

```text
(A - λI)v = 0
```

找对应 eigenvectors。

### 7.3 Diagonalisation

如果一个矩阵有足够多 independent eigenvectors，就能写成：

```text
A = PDP^{-1}
```

其中：

```text
P 的 columns 是 eigenvectors
D 是对角矩阵，主对角线是 eigenvalues
```

直觉：

```text
在合适的 basis 下，
复杂线性变换会变成“每个方向单独缩放”。
```

判断 diagonalizable 的关键标准：

```text
n x n matrix has n linearly independent eigenvectors
```

### 7.4 Applications

notes 里特别强调两个应用：

```text
powers of A
first-order linear differential equations
```

对 powers of `A`：

```text
A = PDP^{-1}
-> A^k = PD^kP^{-1}
```

因为 `D^k` 很容易算。

这就是 diagonalisation 的最大实用价值之一。

1241 还可能涉及：

```text
Markov chains [X]
```

说明 eigenvalue 方法不仅是纯代数，也能进入动态系统和概率过程。

## 8. Chapter 8 做题模板

找 eigenvalues：

```text
solve det(A - λI) = 0
```

找 eigenvectors：

```text
solve (A - λI)v = 0
```

判断 diagonalizable：

```text
count independent eigenvectors
```

求 `A^k`：

```text
if diagonalizable, use PDP^{-1}
```

## 9. Chapter 9 总览：Introduction to Probability and Statistics

Chapter 9 的目录大致是：

```text
9.1 Preliminary set theory
9.2 Probability
9.3 Random variables
9.4 Special distributions
9.5 Continuous random variables
9.6 Special continuous distributions
```

很多人会觉得这章和前面线代断掉了。

确实主题换了，但方法味道没变：

```text
还是在建立定义、结构、规则，然后用这些规则做推导。
```

这章研究的是：

```text
随机事件怎么量化？
随机变量怎么描述？
平均行为和波动怎么衡量？
常见分布长什么样？
```

### 9.1 Preliminary set theory

Probability 的语言建立在集合上。

你必须熟悉：

```text
union
intersection
complement
disjoint events
subset
```

因为事件本质上就是 sample space 的 subsets。

### 9.2 Probability

最基本对象：

```text
sample space Ω
event A subset of Ω
probability P(A)
```

核心公理：

```text
P(A) >= 0
P(Ω) = 1
disjoint additivity
```

常用规则：

```text
P(A^c) = 1 - P(A)
P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
```

### 9.3 Conditional probability and independence

Conditional probability：

```text
P(A|B) = P(A ∩ B) / P(B)
```

意义：

```text
已知 B 已发生后，A 的概率。
```

Independence：

```text
A and B independent iff P(A ∩ B) = P(A)P(B)
```

不要把 independence 和 disjoint 搞混：

```text
disjoint = cannot happen together
independent = one happening does not affect the other
```

这两者完全不是一回事。

### 9.4 Random variables

Random variable 是把随机结果映成数字的函数。

对 discrete random variable `X`，你通常关心：

```text
possible values
probability distribution
mean
variance
```

Mean：

```text
E(X) = sum x p(x)
```

Variance：

```text
Var(X) = E[(X - E(X))^2]
      = E(X^2) - [E(X)]^2
```

直觉：

```text
mean 是中心
variance 是波动大小
```

### 9.5 Special discrete distributions

#### Binomial distribution

情景：

```text
n 次独立试验
每次 success probability = p
X = 成功次数
```

则：

```text
X ~ Bin(n,p)
P(X=k) = C(n,k) p^k (1-p)^(n-k)
```

Mean 和 variance：

```text
E(X) = np
Var(X) = np(1-p)
```

#### Geometric distribution

情景：

```text
重复独立试验直到第一次成功
```

重点是它描述：

```text
waiting time
```

### 9.6 Sign tests

这部分是更偏统计应用的一节。

你可以先抓住大意：

```text
它利用 signs / counts 的离散分布思想做简单统计判断。
```

### 9.7 Continuous random variables

对于 continuous random variable：

```text
用 density function f(x)
```

来描述分布。

性质：

```text
f(x) >= 0
total area under f = 1
P(a <= X <= b) = ∫_a^b f(x) dx
```

Mean：

```text
E(X) = ∫ x f(x) dx
```

Variance：

```text
Var(X) = E(X^2) - [E(X)]^2
```

### 9.8 Normal distribution

Normal distribution 是 Chapter 9 里最重要的 continuous distribution。

你需要抓住：

```text
bell-shaped
symmetric
determined by mean and variance
```

这类题通常要求你：

```text
read probabilities
standardize
use table / calculator / software
```

1241 还提到：

```text
Exponential distribution [X]
```

这是更深入的额外内容。

## 10. Chapter 9 做题模板

Probability：

```text
define events carefully
use complements / unions / intersections
```

Conditional probability：

```text
P(A|B) = P(A∩B)/P(B)
```

Independence：

```text
check P(A∩B)=P(A)P(B)
```

Discrete RV：

```text
write distribution table
compute E(X), E(X^2), Var(X)
```

Binomial：

```text
recognise fixed n independent Bernoulli trials
```

Geometric：

```text
recognise waiting time to first success
```

Continuous RV：

```text
integrate density over interval
```

## 11. 四章之间怎么连起来

Chapter 6-8 是一条非常完整的线代主线：

```text
先定义空间
-> 再看空间之间的线性函数
-> 再找在线性函数下最稳定的方向
```

也就是：

```text
vector spaces
-> linear maps
-> eigenvalues/eigenvectors
```

Chapter 9 则看起来像突然转弯，但它其实还是同一种数学风格：

```text
从定义出发
建立规则
再做运算和推理
```

所以全书可以压成两条主线：

```text
主线 A：抽象线性结构
主线 B：抽象随机结构
```

## 12. 全书最常见的混淆点

```text
1. vector 不一定是箭头，也可以是函数、矩阵、多项式。
2. subspace 必须包含 zero vector。
3. span 和 linear independence 不是一回事。
4. basis = spanning + independent，两边缺一个都不行。
5. kernel 在 domain 里，image 在 codomain 里。
6. rank 是 image 的维数，nullity 是 kernel 的维数。
7. one-to-one 不等于 onto。
8. eigenvector 不能是 zero vector。
9. 有重复 eigenvalue 不代表一定不能 diagonalize。
10. disjoint 和 independent 不是同一个概念。
11. sequence of probabilities、random variable、distribution table 这些对象不要混在一起。
12. mean 描述中心，variance 描述离散程度。
```

## 13. 全书复习顺序建议

### 第一轮：先抓核心定义

```text
Chapter 6:
subspace, span, linear independence, basis, dimension

Chapter 7:
linear map, kernel, image, rank, nullity

Chapter 8:
eigenvalue, eigenvector, diagonalizable

Chapter 9:
probability, conditional probability, independence, random variable, mean, variance
```

### 第二轮：再抓方法题

```text
subspace test
span / independence via linear systems
find basis and dimension
find matrix of linear map
find kernel/image/rank
find eigenvalues/eigenvectors
binomial / geometric / normal distribution questions
```

### 第三轮：再抓联系

```text
span + independence -> basis
kernel + image -> rank-nullity
eigenvectors + basis -> diagonalisation
probability axioms -> conditional probability -> random variables -> distributions
```

## 14. 全书做题 checklist

### Chapter 6

```text
会判断 vector space / subspace
会算 span
会判断 linear independence
会找 basis
会求 dimension
```

### Chapter 7

```text
会判断 map 是否 linear
会写出对应矩阵
会求 kernel 和 image
会算 rank 和 nullity
会判断 one-to-one / onto
```

### Chapter 8

```text
会求 characteristic equation
会找 eigenvalues
会求 eigenvectors
会判断 diagonalizable
会用 diagonalisation 算 A^n
```

### Chapter 9

```text
会做基本概率运算
会算 conditional probability
会判断 independence
会处理 discrete random variables
会用 binomial / geometric
会处理 density function
会算 mean 和 variance
会识别 normal distribution
```

## 15. 全书考前一页纸

最应该背熟的定义/公式：

```text
Chapter 6
subspace
linear combination
span
linear independence
basis
dimension

Chapter 7
T linear iff T(u+v)=T(u)+T(v), T(λu)=λT(u)
ker(T) = {v : T(v)=0}
im(T) = {T(v) : v in V}
rank + nullity = dim(domain)

Chapter 8
Av = λv
det(A - λI)=0
A = PDP^{-1}
A^n = PD^nP^{-1}

Chapter 9
P(A^c)=1-P(A)
P(A∪B)=P(A)+P(B)-P(A∩B)
P(A|B)=P(A∩B)/P(B)
independence: P(A∩B)=P(A)P(B)

E(X)=sum x p(x)   or   ∫ x f(x) dx
Var(X)=E(X^2)-[E(X)]^2

Binomial:
P(X=k)=C(n,k)p^k(1-p)^{n-k}
E(X)=np, Var(X)=np(1-p)
```

## 16. 最后一句 tutor 风格总结

这本 Algebra notes 真正想让你形成的直觉不是：

```text
“我会做矩阵题和概率题。”
```

而是：

```text
我看到一个对象时，会先问它属于什么结构；
看到一个函数时，会先问它保留了什么结构；
看到一个随机过程时，会先问它的分布和平均行为是什么。
```

如果你能这样想，这本书的全书主线就已经被你抓住了。
