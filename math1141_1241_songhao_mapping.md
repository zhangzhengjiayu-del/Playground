# MATH1141 / MATH1241 对应宋浩高数、线代观看表

说明：

- 这个文件按你给的截图整理：宋浩《高等数学》195 集、宋浩《线性代数》35 集。
- 目标不是按国内教材目录硬凑，而是直接回答：UNSW 1141/1241 的知识点对应宋浩哪几集。
- `必看` 表示直接对应；`可补` 表示有帮助但不完全等价；`可跳` 表示对 1141/1241 主线帮助不大。
- 1241 的概率统计部分，你这次截图里没有宋浩概率统计目录，所以只能对应到“宋浩概率统计应该找的章节名”，不能给精确 P 数。

---

## 1. 最快结论

如果只想知道先看什么：

### MATH1241 Calculus

看宋浩高数：

- 多元函数、偏导、全微分、链式法则：`P94, P97-P100, P106`，新版可看 `P181-P188`
- 积分技巧：`P46-P53, P56-P57`
- 微分方程：`P69-P76`
- Taylor、数列、级数、幂级数：`P40, P139-P150`
- 弧长、面积、旋转体、应用：`P61-P68`

### MATH1241 Algebra

看宋浩线代：

- 向量组、线性相关、span、basis 前置：`P19-P23`
- 矩阵、秩、逆矩阵、初等变换：`P8-P18`
- 线性方程组、解空间：`P24-P27`
- 特征值、特征向量、对角化：`P28-P31, P33`

但 1241 Algebra 的抽象 vector space、linear map、kernel/image/rank-nullity，宋浩线代只覆盖一部分，必须回看 UNSW notes。

### MATH1141

看宋浩高数 + 线代：

- 函数、极限、连续：高数 `P4-P17`
- 导数、中值定理、洛必达、Taylor：高数 `P18-P45`
- 积分、反常积分、Riemann sum：高数 `P46-P59`
- 向量、平面、空间几何：高数 `P77-P88` 或新版 `P167-P177`
- 矩阵、行列式、线性方程组：线代 `P1-P18, P24-P27`
- 复数、双曲函数、Maple：宋浩这两个截图里没有完全对应，需要用 1141 自己的 notes。

---

## 2. MATH1241 Calculus 对应宋浩高数

### Chapter 1: Functions of Several Variables

1241 内容：

- functions of several variables
- surfaces in `R^3`
- partial derivatives
- second partial derivatives
- tangent plane
- total differential
- chain rule
- functions of more than two variables

对应宋浩高数：

| 1241 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 多元函数基本概念 | `P94 多元函数的基本概念 平面点集`，新版 `P181-P183` | 必看 |
| 偏导数 | `P97 偏导数`，新版 `P184-P185` | 必看 |
| 全微分 / linear approximation | `P98 全微分`，新版 `P186` | 必看 |
| 多元复合函数链式法则 | `P99-P100 多元复合函数求导`，新版 `P187-P188` | 必看 |
| 隐函数求导 | `P101-P103`，新版 `P190-P191` | 可补 |
| 曲面的切平面与法线 | `P106 空间曲面的切平面与法线` | 必看 |
| 方向导数与梯度 | `P107` | 可补，1241 若没讲梯度可先跳 |
| 多元函数极值、拉格朗日 | `P108-P112` | 多数情况可跳，除非你的 1241 题出现 |
| 空间曲面、空间曲线背景 | `P89-P93` 或新版 `P175-P180` | 可补 |

结论：

1241 Chapter 1 最核心对应 `P94, P97-P100, P106`。如果你看新版目录，就看 `P181-P188` 加 `P190-P191` 里需要的部分。

---

### Chapter 2: Integration Techniques

1241 内容：

- trigonometric integrals
- reduction formulae
- trigonometric substitution
- rational functions and partial fractions
- other substitutions

对应宋浩高数：

| 1241 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 不定积分定义和性质 | `P46-P49` | 必看 |
| 换元积分法 | `P50-P51` | 必看 |
| 分部积分法 | `P52`，定积分版 `P57` | 必看 |
| 有理函数积分 / partial fractions | `P53` | 必看 |
| 定积分换元 | `P56` | 可补 |
| 三角代换、三角积分 | `P50-P53` 中相关技巧 | 必看，但宋浩标题不一定单独写“trig substitution” |
| 反常积分 | `P58-P59` | 可补，后面级数 integral test 也会用 |
| Gamma 函数 | `P60` | 可跳 |

结论：

1241 Chapter 2 直接看 `P46-P53`。如果题目涉及定积分技巧，再看 `P56-P57`。

---

### Chapter 3: Ordinary Differential Equations

1241 内容：

- initial value problems
- separable ODEs
- first order linear ODEs
- exact ODEs
- modelling with ODEs
- second order linear ODEs

对应宋浩高数：

| 1241 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 微分方程基本概念 | `P69` | 必看 |
| 可分离变量微分方程 | `P70` | 必看 |
| 齐次方程 | `P71` | 可补，1241 不一定重点 |
| 一阶线性微分方程 / integrating factor | `P72` | 必看 |
| 可降阶高阶微分方程 | `P73` | 可跳或可补 |
| 高阶线性微分方程 | `P74` | 必看 |
| 常系数齐次线性微分方程 | `P75`，留档 `P161` | 必看 |
| 常系数非齐次线性微分方程 | `P76` | 必看 |
| exact ODE | 截图标题中没有明确对应 | 用 UNSW notes 补 |
| modelling / IVP | `P69-P76` 中穿插理解 | 用 UNSW 题型补 |

你之前问的“齐次方程、常系数一阶线性微分方程要不要学”：

- 一阶线性微分方程：要学，对应 `P72`。
- 常系数齐次/非齐次二阶线性微分方程：要学，对应 `P75-P76`。
- 可分离变量：要学，对应 `P70`。
- 一阶齐次方程：通常不是 1241 主线重点，但如果 notes/题目出现就看 `P71`。
- exact ODE：1241 notes 里有，宋浩截图里没有清楚对应，直接用 UNSW notes 学。

---

### Chapter 4: Taylor Series, Sequences, Infinite Series

1241 内容：

- Taylor polynomial
- Taylor theorem
- sequences
- infinite series
- convergence tests
- Taylor series
- power series

对应宋浩高数：

| 1241 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| Taylor formula / Taylor polynomial | `P40 泰勒公式` | 必看 |
| 数列极限 | `P7-P8` | 必看 |
| 常数项级数概念 | `P139` | 必看 |
| 正项级数判别 | `P140-P141` | 必看 |
| 交错级数 | `P142` | 必看 |
| 任意项级数 / 绝对收敛 | `P143` | 必看 |
| 幂级数 | `P144-P147` | 必看 |
| 函数展开成幂级数 / Taylor series | `P148-P150` | 必看 |
| Fourier series | `P151` | 可跳，1241 通常不考 |
| 反常积分背景 | `P58-P59` | 可补，用于 integral test 理解 |

结论：

1241 Chapter 4 直接看 `P7-P8, P40, P139-P150`。

---

### Chapter 5: Applications

1241 内容：

- average value
- arc length
- speed
- surface area

对应宋浩高数：

| 1241 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 定积分应用总方法 | `P61 定积分的应用-元素法` | 必看 |
| 平面面积 | `P62-P63` | 可补 |
| 极坐标面积 | `P64-P65` | 可补 |
| 旋转体体积 | `P66` | 可补 |
| 弧长 | `P67` | 必看 |
| 物理应用 / speed 直觉 | `P68` | 可补 |
| average value | 没有在截图标题里单独出现 | 用 UNSW notes 补 |
| surface area of revolution | 宋浩截图里没有很明确的单独标题 | 用 UNSW notes 补；`P66-P68` 可当背景 |

结论：

1241 Chapter 5 重点看 `P61-P68`，但 average value 和 surface area 公式还是以 UNSW notes 为准。

---

## 3. MATH1241 Algebra 对应宋浩线代 / 概率统计

### Chapter 6: Vector Spaces

1241 内容：

- field
- vector space definition
- examples of vector spaces
- subspace
- linear combination
- span
- linear independence
- basis
- dimension
- coordinates

对应宋浩线代：

| 1241 知识点 | 宋浩线代对应 | 重要程度 |
|---|---:|---|
| 向量基本概念、线性运算 | `P19` | 必看 |
| 线性组合、线性表示 | `P20` | 必看 |
| 线性相关、线性无关 | `P21` | 必看 |
| 极大线性无关组 | `P22` | 可补，对 basis 有帮助 |
| 向量组的秩 | `P23` | 必看 |
| 矩阵的秩 | `P18` | 必看 |
| 内积、正交 | `P32` | 可补 |
| determinant 前置 | `P1-P7` | 只在需要行列式时看 |
| matrix 前置 | `P8-P18` | 需要矩阵语言时看 |

宋浩没完全覆盖的 1241 部分：

- 抽象 vector space 的公理证明。
- 函数空间、polynomial space、matrix space 作为 vector space。
- subspace test 的抽象证明。
- coordinate vector relative to a non-standard basis。
- field 的抽象定义。

结论：

宋浩线代 `P19-P23` 能帮你理解“向量组”那条线，但 1241 Chapter 6 比国内线代更抽象，不能只靠宋浩。

---

### Chapter 7: Linear Transformations

1241 内容：

- linear map / linear transformation
- matrix representation of a linear map
- geometric transformations
- kernel
- image
- rank
- nullity
- one-to-one
- onto
- invertible

对应宋浩线代：

| 1241 知识点 | 宋浩线代对应 | 重要程度 |
|---|---:|---|
| 矩阵概念与运算 | `P8-P11` | 必看 |
| 方阵、逆矩阵 | `P12-P16` | 必看 |
| 初等变换 | `P15-P16` | 必看 |
| 矩阵的秩 | `P18` | 必看 |
| 线性方程组表示 | `P24` | 必看 |
| 线性方程组解的判定 | `P25` | 必看 |
| 线性方程组解的性质与结构 | `P26` | 必看 |
| 线性方程组解法 | `P27` | 必看 |

宋浩没完全覆盖的 1241 部分：

- kernel 和 image 的正式定义。
- rank-nullity theorem。
- one-to-one / onto 和 kernel/image 的关系。
- 把 linear transformation 当作函数，而不是只当作矩阵乘法。
- 从任意 basis 写出 transformation matrix。

结论：

1241 Chapter 7 可以用宋浩 `P8-P18, P24-P27` 补矩阵和方程组计算，但概念必须回 UNSW notes。

---

### Chapter 8: Eigenvalues and Eigenvectors

1241 内容：

- eigenvalue
- eigenvector
- characteristic equation
- eigenspace
- diagonalisation

对应宋浩线代：

| 1241 知识点 | 宋浩线代对应 | 重要程度 |
|---|---:|---|
| 特征值、特征向量定义与求法 | `P28` | 必看 |
| 特征值与特征向量性质 | `P29` | 必看 |
| 相似矩阵 | `P30` | 可补 |
| 对角化 | `P31` | 必看 |
| 正交矩阵 / 内积 | `P32` | 可补 |
| 实对称矩阵对角化 | `P33` | 可补，若 1241 讲到 symmetric matrix 就看 |
| 二次型 | `P34-P35` | 多数情况可跳 |

结论：

1241 Chapter 8 和宋浩线代 `P28-P31` 对应度很高。

---

### Chapter 9: Probability and Statistics

1241 内容：

- set theory in probability
- probability axioms
- conditional probability
- independence
- random variables
- mean and variance
- binomial distribution
- geometric distribution
- continuous random variables
- normal distribution

你这次截图没有宋浩概率统计目录，所以不能精确到 P 数。对应宋浩概率统计时应找这些标题：

| 1241 知识点 | 宋浩概率统计应找的部分 |
|---|---|
| 样本空间、事件、集合运算 | 随机事件、事件关系、事件运算 |
| 概率公理 | 概率定义、概率性质 |
| 古典概率 | 古典概型 |
| 条件概率 | 条件概率 |
| Bayes 公式 | 全概率公式、贝叶斯公式 |
| 独立性 | 事件独立性 |
| 随机变量 | 随机变量及分布函数 |
| 离散型随机变量 | 离散型随机变量、分布律 |
| expectation | 数学期望 |
| variance | 方差、标准差 |
| binomial distribution | 二项分布 |
| geometric distribution | 几何分布 |
| continuous random variables | 连续型随机变量、概率密度 |
| normal distribution | 正态分布 |

结论：

1241 概率统计不要用宋浩线代找；要找宋浩《概率论与数理统计》。如果你再发那个播放列表截图，我可以把这一块补成精确 P 数。

---

## 4. MATH1141 对应宋浩高数和线代

我按你本地 `math1141_complete_review_notes.md` 和续篇的标题来对。

### 1141: 基础代数与函数

1141 内容：

- 函数奇偶性
- 连续与可导
- 反函数
- 小量近似 / Taylor
- 极限与渐近

对应宋浩高数：

| 1141 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 函数概念 | `P4` | 必看 |
| 函数特性 | `P5` | 必看 |
| 反函数、复合函数、初等函数 | `P6` | 必看 |
| 数列极限 | `P7-P8` | 可补 |
| 函数极限 | `P10` | 必看 |
| 无穷小、无穷大 | `P11` | 必看 |
| 极限运算法则 | `P12` | 必看 |
| 两个重要极限 | `P13` | 必看 |
| 无穷小比较 | `P14` | 必看 |
| 连续与间断点 | `P15-P17` | 必看 |
| Taylor / 小量近似 | `P40` | 必看 |

结论：

1141 的函数、极限、连续直接看高数 `P4-P17`，Taylor 看 `P40`。

---

### 1141: 微分学

1141 内容：

- 导数公式
- 可导与连续
- 中值定理
- Rolle 定理
- 洛必达
- 隐式/参数曲线
- 反函数

对应宋浩高数：

| 1141 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 导数定义 | `P18` | 必看 |
| 常用求导公式 | `P19, P28` | 必看 |
| 单侧导数 | `P20` | 可补 |
| 导数几何意义 | `P21-P22` | 必看 |
| 可导与连续关系 | `P23` | 必看 |
| 求导法则 | `P24-P27` | 必看 |
| 高阶导数 | `P29` | 可补 |
| 隐函数求导 | `P30` | 必看 |
| 参数方程求导 | `P31-P32` | 必看 |
| 微分 | `P33-P36` | 可补 |
| 中值定理 | `P37-P38` | 必看 |
| 洛必达法则 | `P39` | 必看 |
| 函数单调、凹凸、极值 | `P41-P44` | 可补 |
| 曲率 | `P45` | 多数情况可跳 |

结论：

1141 微分学主线看高数 `P18-P44`。

---

### 1141: 积分、Riemann sum、反常积分

1141 内容：

- 微积分基本定理
- 分部积分
- 换元积分
- 反常积分
- Riemann sum
- Riemann integrable
- 奇偶函数积分

对应宋浩高数：

| 1141 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 不定积分 | `P46-P53` | 必看 |
| 定积分定义与性质 | `P54` | 必看 |
| 微积分基本公式 | `P55` | 必看 |
| 定积分换元 | `P56` | 必看 |
| 定积分分部积分 | `P57` | 必看 |
| 反常积分：无穷限 | `P58` | 必看 |
| 反常积分：无界函数 | `P59` | 必看 |
| 定积分应用 | `P61-P68` | 可补 |

结论：

1141 积分对应高数 `P46-P59`，应用题再看 `P61-P68`。

---

### 1141: 向量、平面、空间几何、极坐标

1141 内容：

- scalar/vector
- dot product
- cross product
- plane
- collinearity
- projection
- polar coordinates
- parametric curves

对应宋浩高数：

| 1141 知识点 | 宋浩高数对应 | 重要程度 |
|---|---:|---|
| 向量及线性运算 | `P77`，新版 `P167-P170` | 必看 |
| 空间直角坐标系 | `P78`，新版 `P169` | 必看 |
| 向量模、两点距离 | `P79`，新版 `P171` | 必看 |
| 方向角、方向余弦、投影 | `P80`，新版 `P172` | 必看 |
| 数量积 / dot product | `P81`，新版 `P173` | 必看 |
| 向量积 / cross product | `P82`，新版 `P174` | 必看 |
| 平面及其方程 | `P83-P85`，新版 `P176` | 必看 |
| 空间直线及其方程 | `P86-P87`，新版 `P177` | 可补 |
| 曲面、柱面、二次曲面 | `P89-P93`，新版 `P175-P180` | 可补 |
| 极坐标基础 | `P64-P65`，另有 `P115-P117` | 必看极坐标基础即可 |
| 参数方程求导 | `P31-P32` | 必看 |

结论：

1141 向量几何直接看高数 `P77-P87`，新版对应 `P167-P177`。

---

### 1141: 矩阵、行列式、线性方程组

1141 内容：

- matrix operations
- transpose
- inverse
- symmetric / skew-symmetric / orthogonal
- determinant
- linear systems
- span
- homogeneous systems

对应宋浩线代：

| 1141 知识点 | 宋浩线代对应 | 重要程度 |
|---|---:|---|
| 二阶三阶行列式 | `P1` | 必看 |
| n 阶行列式 | `P2` | 可补 |
| 行列式性质 | `P3` | 必看 |
| 按行/多行展开 | `P4-P5` | 必看 |
| 行列式计算 | `P6` | 必看 |
| 克莱姆法则 | `P7` | 可补 |
| 矩阵概念 | `P8` | 必看 |
| 矩阵加减、数乘 | `P9` | 必看 |
| 矩阵乘法 | `P10` | 必看 |
| 转置、对称、反对称 | `P11` | 必看 |
| 方阵行列式、伴随矩阵、逆矩阵 | `P12-P14` | 必看 |
| 初等变换、初等矩阵 | `P15-P16` | 必看 |
| 分块矩阵 | `P17` | 可跳或可补 |
| 矩阵的秩 | `P18` | 必看 |
| 线性方程组 | `P24-P27` | 必看 |
| span / linear combination | `P19-P23` | 必看 |
| 正交矩阵 | `P32` | 可补 |

结论：

1141 的矩阵和线性方程组，宋浩线代 `P1-P18, P19-P27, P32` 基本够用。

---

### 1141: 复数、双曲函数、Maple

1141 内容：

- complex numbers
- polar form
- argument and modulus
- conjugate
- roots of unity
- real-coefficient polynomials
- hyperbolic functions
- Maple syntax

对应情况：

| 1141 知识点 | 宋浩对应 |
|---|---|
| 复数基础 | 这两个截图里的宋浩高数/线代没有完整对应 |
| 复数极形式 | 这两个截图里没有完整对应 |
| 单位根 | 这两个截图里没有完整对应 |
| 实系数多项式复根成对 | 这两个截图里没有完整对应 |
| 双曲函数 | 这两个截图里没有完整对应 |
| Maple syntax | 宋浩不讲，必须看 UNSW/Maple notes |

结论：

1141 的复数、双曲函数、Maple 不要靠这两个宋浩列表，直接看你的 1141 notes。

---

## 5. 宋浩高数里对 1141/1241 多余的部分

这些不是完全没用，而是相对 1141/1241 主线不优先。

| 宋浩高数部分 | 对 1141/1241 是否需要 |
|---|---|
| `P60 Gamma 函数` | 多数情况可跳 |
| `P73 可降阶高阶微分方程` | 1241 可补，但通常不优先 |
| `P108-P112 多元极值、拉格朗日` | 1241 若没讲可跳 |
| `P113-P123 二重/三重积分及应用` | 1241 notes 主线通常不需要 |
| `P124-P138 曲线积分、曲面积分、Green/Gauss/Stokes` | 1141/1241 基本可跳 |
| `P151 Fourier series` | 1241 通常可跳 |
| `P154-P166 留档重积分/三重积分` | 多数可跳 |
| `P167-P192 新版向量/多元函数` | 和前面旧版内容重复，选一套看即可 |

---

## 6. 宋浩线代里对 1141/1241 多余或低优先级的部分

| 宋浩线代部分 | 对 1141/1241 是否需要 |
|---|---|
| `P17 分块矩阵` | 1141/1241 通常低优先级 |
| `P30 相似矩阵` | 1241 eigen/diagonalisation 有帮助，可补 |
| `P32 内积与正交矩阵` | 1141/1241 有时有用 |
| `P33 实对称矩阵对角化` | 1241 若讲 symmetric matrix/eigen 可补 |
| `P34-P35 二次型` | 1141/1241 主线通常可跳 |

---

## 7. 1241/1141 里宋浩不能替代 UNSW notes 的部分

### 1241 不能只靠宋浩的地方

- 抽象 vector space 的公理。
- subspace 的抽象证明。
- function space、polynomial space、matrix space 作为 vector space。
- basis 和 coordinates 在非标准基下的表达。
- linear map 的 kernel、image、rank-nullity。
- exact ODE。
- average value 和 surface area 的 UNSW 指定公式。
- probability/statistics 的精确考法。

### 1141 不能只靠宋浩的地方

- 复数的 UNSW 题型。
- Maple syntax。
- 双曲函数。
- 一些证明题 essay 写法。
- Riemann integrable 的严格定义题。
- 1141 特有的综合题，比如矩阵 + Rolle、复数 + group/field 这种混合题。

---

## 8. 推荐观看顺序

### 如果你现在学 1141

1. 高数 `P4-P17`：函数、极限、连续。
2. 高数 `P18-P45`：导数、中值定理、洛必达、Taylor。
3. 高数 `P46-P59`：积分、微积分基本定理、反常积分。
4. 高数 `P61-P68`：定积分应用、极坐标、弧长。
5. 高数 `P77-P87` 或新版 `P167-P177`：向量、平面、空间几何。
6. 线代 `P1-P18`：行列式、矩阵、逆、秩。
7. 线代 `P19-P27`：向量组、span、线性方程组。
8. 回 UNSW notes 学复数、双曲函数、Maple。

### 如果你现在学 1241 Calculus

1. 高数 `P94, P97-P100, P106`：多元函数、偏导、全微分、链式法则、切平面。
2. 高数 `P46-P53`：积分技巧。
3. 高数 `P69-P76`：ODE。
4. 高数 `P7-P8, P40, P139-P150`：数列、Taylor、级数、幂级数。
5. 高数 `P61-P68`：应用、弧长、速度、面积背景。

### 如果你现在学 1241 Algebra

1. 线代 `P19-P23`：向量组、线性组合、线性相关、秩。
2. 线代 `P8-P18`：矩阵、逆、初等变换、秩。
3. 线代 `P24-P27`：线性方程组和解空间。
4. 线代 `P28-P31`：特征值、特征向量、对角化。
5. 回 UNSW notes 学 abstract vector space、kernel、image、rank-nullity。
6. 概率统计另找宋浩概率统计目录：事件、条件概率、独立、随机变量、期望方差、二项/几何/正态分布。

