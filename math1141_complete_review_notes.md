# MATH1141 完整复习笔记：基础知识 + 做题思路

说明：这份笔记是给“知识储备不够、很多公式忘了”的复习版本。它结合了 `math_solutions_0787_0886.md` 和前面两份总结，把题目背后的基础知识补起来。

目标不是把所有数学都讲完，而是让你看到 MATH1141 常见题时知道：

1. 题目属于哪一类；
2. 应该用哪个公式；
3. 为什么这个公式能用；
4. Maple 答案大概怎么输入；
5. essay box 证明题怎么写。

---

## 0. 最重要的复习方法

MATH1141 的题目看起来很多，其实反复考这些动作：

1. 判断类型：scalar、vector、matrix、function、complex number。
2. 判断条件：连续、可导、可逆、正交、对称、单调、有界。
3. 把复杂对象变简单：复数拆实部虚部，参数曲线消参数，极坐标转直角坐标。
4. 先看结构，不要急着算：矩阵看主元，积分看主导项，极限看最高阶。
5. 证明题先说定理条件，再套结论。

一个通用答题流程：

1. 写出已知条件；
2. 写出要证明/要求的目标；
3. 选择对应定理或公式；
4. 检查定理条件；
5. 套公式；
6. 写结论。

---

## 1. 基础代数与函数

### 1.1 常见函数奇偶性

奇函数：

\[
f(-x)=-f(x).
\]

偶函数：

\[
f(-x)=f(x).
\]

常见例子：

- \(x,x^3,\sin x,\sinh x\) 是奇函数；
- \(x^2,x^4,\cos x,\cosh x,\operatorname{sech}x\) 是偶函数。

乘法规则：

- even \(\times\) even = even；
- odd \(\times\) odd = even；
- even \(\times\) odd = odd。

加法规则：

- odd + odd = odd；
- even + even = even；
- odd + even 通常既不是 odd 也不是 even。

重要积分结论：

\[
\int_{-R}^{R}\text{odd function}\,dx=0.
\]

\[
\int_{-R}^{R}\text{even function}\,dx=2\int_0^R f(x)\,dx.
\]

例题：

\[
f(x)=x+x^{14}\sinh^5x.
\]

\(x\) 是 odd，\(x^{14}\) 是 even，\(\sinh^5x\) 是 odd，所以 \(x^{14}\sinh^5x\) 是 odd。odd + odd = odd，因此

\[
\int_{-R}^{R}f(x)\,dx=0.
\]

### 1.2 连续与可导

连续的直观意思：图像不断开。

定义语言：

\[
\lim_{x\to a}f(x)=f(a).
\]

可导的直观意思：在该点有切线斜率。

重要关系：

\[
\text{可导}\Rightarrow\text{连续}.
\]

但反过来不一定。比如

\[
f(x)=|x|
\]

在 \(0\) 连续，但不可导。

多项式、指数、三角函数在其定义域内都连续。

### 1.3 反函数

一个函数有反函数，需要它 one-to-one。

常用判断方法：

如果

\[
f'(x)>0
\]

在整个区间成立，则 \(f\) 严格递增，所以 one-to-one，所以有反函数。

反函数值：

\[
f^{-1}(a)=b
\]

意思是

\[
f(b)=a.
\]

反函数导数：

\[
(f^{-1})'(a)=\frac1{f'(b)},\qquad b=f^{-1}(a).
\]

例题：

\[
f(x)=x^3+5x-3.
\]

求 \((f^{-1})'(3)\)。

先找 \(b\)：

\[
f(1)=1+5-3=3.
\]

所以

\[
f^{-1}(3)=1.
\]

\[
f'(x)=3x^2+5,\quad f'(1)=8.
\]

所以

\[
(f^{-1})'(3)=\frac18.
\]

### 1.4 常见小量近似：这是泰勒展开吗？

是的，类似

\[
\sqrt{1+x}=1+\frac{x}{2}+o(x)
\]

来自 Taylor expansion。

Taylor expansion 的意思是：当 \(x\) 很接近 \(0\) 时，可以用多项式近似函数。

最常用的几个：

\[
e^x=1+x+\frac{x^2}{2}+\cdots
\]

所以

\[
e^x-1\sim x.
\]

\[
\ln(1+x)=x-\frac{x^2}{2}+\cdots
\]

所以

\[
\ln(1+x)\sim x.
\]

\[
\sqrt{1+x}=1+\frac{x}{2}-\frac{x^2}{8}+\cdots
\]

所以

\[
\sqrt{1+x}=1+\frac{x}{2}+o(x).
\]

这里 \(o(x)\) 的意思是“比 \(x\) 小得多的东西”：

\[
\frac{o(x)}{x}\to0.
\]

例题：

求

\[
\sqrt{x^2+20x}-x
\]

当 \(x\to\infty\) 的极限。

写成

\[
x\sqrt{1+\frac{20}{x}}-x.
\]

用

\[
\sqrt{1+u}=1+\frac u2+o(u).
\]

这里 \(u=20/x\)，所以

\[
x\left(1+\frac{10}{x}+o(1/x)\right)-x
=10+o(1).
\]

极限是 \(10\)。

这类展开在“比值趋于 1，但差不趋于 0”的题里很常见。

---

## 2. 向量基础

### 2.1 scalar 和 vector

scalar 是一个数。

vector 是一列数，比如

\[
<1,2,3>.
\]

向量可以加减：

\[
<1,2>+<3,4>=<4,6>.
\]

标量可以乘向量：

\[
3<1,2>=<3,6>.
\]

但 scalar 和 vector 不能相加：

\[
5+<1,2>
\]

无定义。

### 2.2 点积

两个同维向量：

\[
u=<u_1,u_2,\dots,u_n>,\quad v=<v_1,v_2,\dots,v_n>.
\]

点积：

\[
u\cdot v=u_1v_1+u_2v_2+\cdots+u_nv_n.
\]

输出是 scalar。

几何意义：

\[
u\cdot v=\|u\|\|v\|\cos\theta.
\]

若

\[
u\cdot v=0,
\]

则 \(u\) 和 \(v\) 垂直。

### 2.3 叉积

只在 \(\mathbb R^3\) 中使用。

\[
u\times v
\]

输出一个 vector，它垂直于 \(u\) 和 \(v\)。

常用性质：

\[
u\times v=-v\times u.
\]

\[
u\times u=0.
\]

\[
u\times(v+w)=u\times v+u\times w.
\]

### 2.4 平面

三维平面常见形式：

标准式：

\[
ax+by+cz=d.
\]

法向量：

\[
n=<a,b,c>.
\]

参数式：

\[
x=A+s u+t v.
\]

其中 \(u,v\) 是平面方向向量。

法向量：

\[
n=u\times v.
\]

点 \(P\) 在平面上：

\[
(P-A)\cdot n=0.
\]

点到平面距离：

\[
d=\frac{|(P-A)\cdot n|}{\|n\|}.
\]

### 2.5 共线

两点 \(A,B\) 的方向向量：

\[
B-A.
\]

三个点 \(A,B,C\) 共线，当且仅当

\[
C-A
\]

是

\[
B-A
\]

的倍数。

例题：

\((2,2)\)、\((-2,-3)\)、\((a,b)\) 共线。

方向：

\[
(-2,-3)-(2,2)=(-4,-5).
\]

所以

\[
(a,b)=(2,2)+t(-4,-5).
\]

检查选项时，看差向量是不是 \((-4,-5)\) 的倍数。

### 2.6 投影

\[
\operatorname{proj}_b(v)=\frac{v\cdot b}{b\cdot b}b.
\]

它表示把 \(v\) 投到 \(b\) 的方向上。

重要性质：

\[
\operatorname{proj}_b(cv)=c\operatorname{proj}_b(v).
\]

\[
\operatorname{proj}_{cb}(v)=\operatorname{proj}_b(v),\quad c\ne0.
\]

因为投影方向不变。

---

## 3. 矩阵基础

### 3.1 矩阵是什么

矩阵是数字排成的表。

比如

\[
A=
\begin{pmatrix}
1&2&3\\
4&5&6
\end{pmatrix}
\]

是 \(2\times3\) 矩阵：2 行 3 列。

### 3.2 矩阵乘向量

如果

\[
A=\begin{pmatrix}
1&2\\
3&4
\end{pmatrix},\quad x=<x_1,x_2>,
\]

则

\[
Ax=
\begin{pmatrix}
1x_1+2x_2\\
3x_1+4x_2
\end{pmatrix}.
\]

每一行点乘向量。

### 3.3 矩阵乘矩阵

若

\[
C=AB,
\]

则

\[
C_{ij}=\text{row}_i(A)\cdot\text{column}_j(B).
\]

口诀：

\[
C_{2,3}
\]

就是 \(A\) 第 2 行点乘 \(B\) 第 3 列。

矩阵乘法通常不可交换：

\[
AB\ne BA.
\]

所以化简矩阵时不能随便换顺序。

### 3.4 转置矩阵

转置就是行列互换。

\[
A=
\begin{pmatrix}
1&2&3\\
4&5&6
\end{pmatrix}
\]

则

\[
A^T=
\begin{pmatrix}
1&4\\
2&5\\
3&6
\end{pmatrix}.
\]

转置运算法则：

\[
(A+B)^T=A^T+B^T.
\]

\[
(cA)^T=cA^T.
\]

\[
(AB)^T=B^TA^T.
\]

最后一条最容易错：乘积转置，顺序反过来。

例题：

化简

\[
(C^TA^T)^T.
\]

因为

\[
C^TA^T=(AC)^T,
\]

所以

\[
(C^TA^T)^T=AC.
\]

### 3.5 逆矩阵

方阵 \(A\) 的逆矩阵 \(A^{-1}\) 满足

\[
AA^{-1}=A^{-1}A=I.
\]

只有方阵才可能有逆。

逆矩阵运算法则：

\[
(AB)^{-1}=B^{-1}A^{-1}.
\]

注意顺序也反过来。

\[
(A^T)^{-1}=(A^{-1})^T.
\]

\[
(A^{-1})^T=(A^T)^{-1}.
\]

判断可逆的等价条件：

- \(\det(A)\ne0\)；
- \(Ax=0\) 只有零解；
- 每一列都有主元；
- 列向量线性无关；
- \(A\) 的 RREF 是 \(I\)。

### 3.6 Identity matrix 和 zero matrix

Identity matrix：

\[
I=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}.
\]

性质：

\[
AI=IA=A.
\]

Zero matrix \(O\)：所有元素都是 \(0\)。

### 3.7 对称、反对称、正交矩阵

对称矩阵：

\[
A^T=A.
\]

主对角线两边相等。

反对称/skew-symmetric：

\[
A^T=-A.
\]

对角线一定是 \(0\)。

正交/orthogonal：

\[
A^TA=I.
\]

等价于

\[
A^{-1}=A^T.
\]

正交矩阵可以理解成“保持长度和角度”的矩阵。

### 3.8 \(A^TA=0\) 为什么推出 \(A=0\)

\[
A^TA
\]

的第 \(i,i\) 个元素是 \(A\) 第 \(i\) 列和自己点积，也就是该列长度平方。

如果

\[
A^TA=0,
\]

每一列长度平方都是 \(0\)，所以每一列都是零向量。

因此

\[
A=0.
\]

同理，如果

\[
CC^T=0,
\]

则每一行长度平方为 \(0\)，所以

\[
C=0.
\]

---

## 4. 行列式

### 4.1 行列式告诉我们什么

方阵 \(A\)：

- \(\det(A)\ne0\)：可逆；
- \(\det(A)=0\)：不可逆，列向量线性相关。

### 4.2 行操作对行列式的影响

1. 交换两行：

\[
\det\mapsto-\det.
\]

2. 某一行乘以 \(k\)：

\[
\det\mapsto k\det.
\]

3. 某一行加上另一行的倍数：

\[
\det\text{ 不变}.
\]

列操作也一样。

### 4.3 整个矩阵乘以常数

若 \(A\) 是 \(n\times n\)，则

\[
\det(cA)=c^n\det(A).
\]

因为 \(cA\) 相当于每一行都乘以 \(c\)，一共有 \(n\) 行。

### 4.4 余子式展开

沿第 \(i\) 行展开：

\[
\det(A)=\sum_j(-1)^{i+j}a_{ij}M_{ij}.
\]

符号棋盘：

\[
\begin{pmatrix}
+&-&+&-\\
-&+&-&+\\
+&-&+&-\\
-&+&-&+
\end{pmatrix}.
\]

### 4.5 三重积

如果 \(A\) 的列是 \(u,v,w\)，则

\[
\det(A)=u\cdot(v\times w).
\]

几何意义：平行六面体有向体积。

\[
\det(A)=0
\]

表示 \(u,v,w\) 线性相关，三维体积为 \(0\)。

---

## 5. 线性方程组

### 5.1 矩阵形式

向量方程

\[
x_1v_1+x_2v_2+x_3v_3=b
\]

写成

\[
Ax=b,
\]

其中 \(A\) 的列就是 \(v_1,v_2,v_3\)。

### 5.2 增广矩阵

\[
(A|b)
\]

就是把右端 \(b\) 接在 \(A\) 右边。

### 5.3 解的个数

行化简后：

矛盾行：

\[
[0\ 0\ \cdots\ 0|c],\quad c\ne0.
\]

表示无解。

没有矛盾行：

- 每个未知数列都有主元：唯一解；
- 有自由变量：无穷多解。

### 5.4 齐次方程

\[
Ax=0
\]

永远至少有零解。

如果未知数比方程多，比如 \(3\times4\) 矩阵，通常一定有自由变量，因此有非零解。

### 5.5 span

\[
y\in\operatorname{span}(a_1,\dots,a_n)
\]

意思是 \(y\) 可以写成这些向量的线性组合。

如果 \(A\) 的列是 \(a_1,\dots,a_n\)，那么

\[
y\in\operatorname{span}(a_1,\dots,a_n)
\]

等价于

\[
Ax=y
\]

有至少一个解。

### 5.6 参数题

如果行化简中除以了某个含参数的式子，比如 \(k-4\)，必须单独检查

\[
k=4.
\]

不能直接套除法之后的结果。

做法：

1. 找所有让主元为 \(0\) 的参数；
2. 找所有被除过的参数式为 \(0\) 的值；
3. 逐个代回原矩阵检查。

---

## 6. 微积分：导数、积分、定理

### 6.1 导数基本公式

\[
\frac d{dx}x^n=nx^{n-1}.
\]

\[
\frac d{dx}e^x=e^x.
\]

\[
\frac d{dx}\ln x=\frac1x.
\]

\[
\frac d{dx}\sin x=\cos x.
\]

\[
\frac d{dx}\cos x=-\sin x.
\]

链式法则：

\[
\frac d{dx}f(g(x))=f'(g(x))g'(x).
\]

例：

\[
\frac d{dx}e^{(10x+8)^2}
=e^{(10x+8)^2}\cdot2(10x+8)\cdot10.
\]

### 6.2 中值定理

条件：

- \(f\) 在 \([a,b]\) 连续；
- \(f\) 在 \((a,b)\) 可导。

结论：

\[
\frac{f(b)-f(a)}{b-a}=f'(c)
\]

for some \(c\in(a,b)\)。

用途：

如果 \(f'(x)\le M\)，则

\[
f(b)-f(a)\le M(b-a).
\]

如果 \(m<f'(x)<M\)，则

\[
m(b-a)<f(b)-f(a)<M(b-a).
\]

### 6.3 介值定理

如果 \(f\) 连续，且 \(f(a)\) 和 \(f(b)\) 一正一负，则中间一定有 \(c\)：

\[
f(c)=0.
\]

用途：

证明至少一个零点。

证明路径穿过平面。

### 6.4 Rolle 定理

如果：

- \(F\) 在 \([a,b]\) 连续；
- \(F\) 在 \((a,b)\) 可导；
- \(F(a)=F(b)\)，

则存在 \(c\in(a,b)\)：

\[
F'(c)=0.
\]

常见题：行列式函数 \(F(x)\)，因为端点处两行相同，所以 \(F(a)=F(b)=0\)，然后用 Rolle。

### 6.5 微积分基本定理

如果

\[
F(x)=\int_a^x f(t)\,dt,
\]

且 \(f\) 在 \(x\) 连续，则

\[
F'(x)=f(x).
\]

如果上限是 \(u(x)\)：

\[
\frac d{dx}\int_a^{u(x)}f(t)\,dt=f(u(x))u'(x).
\]

如果上下限都变：

\[
\frac d{dx}\int_{a(x)}^{b(x)}f(t)\,dt
=f(b(x))b'(x)-f(a(x))a'(x).
\]

口诀：上限正，下限负，各乘自己的导数。

### 6.6 分部积分

\[
\int u\,v'=uv-\int v\,u'.
\]

常见选择：

- 多项式放 \(u\)，因为求导会变简单；
- 反三角函数放 \(u\)，\(v'=1\)；
- \(P(x)f'(x)\) 中取 \(u=P(x)\)，\(v'=f'(x)\)。

定积分：

\[
\int_a^bP(x)f'(x)\,dx=[P(x)f(x)]_a^b-\int_a^bP'(x)f(x)\,dx.
\]

### 6.7 换元积分

换元就是把复杂表达式换成新变量。

例：

\[
\int \frac1{x-1}dx.
\]

令

\[
u=x-1,\quad du=dx.
\]

就变成

\[
\int\frac1u\,du.
\]

例：

\[
\int 18x^{20}dx
\]

想变成

\[
\int6u^6du.
\]

令

\[
u=x^3,\quad du=3x^2dx.
\]

则

\[
6u^6du=6x^{18}\cdot3x^2dx=18x^{20}dx.
\]

### 6.8 反常积分

\[
\int_1^\infty\frac1{x^p}dx
\]

收敛当且仅当

\[
p>1.
\]

\[
\int_0^1 x^p dx
\]

收敛当且仅当

\[
p>-1.
\]

比较判别：

要证明收敛：找更大的、已收敛的函数。

要证明发散：找更小的、已发散的函数。

极限比较：

如果

\[
\lim_{x\to\infty}\frac{f(x)}{g(x)}=c,
\]

且 \(0<c<\infty\)，则 \(f,g\) 同收敛或同发散。

### 6.9 Riemann sum

递增函数：

- 左端点和低估；
- 右端点和高估。

递减函数：

- 左端点和高估；
- 右端点和低估。

中点和：

- 对线性函数精确；
- 对 convex up 函数低估；
- 对 concave down 函数高估。

### 6.10 Riemann integrable

连续函数在闭区间上 Riemann integrable。

有界且只有有限多个不连续点，也 Riemann integrable。

改变有限个点的函数值，不改变积分值。

---

## 7. 极限与渐近

### 7.1 主导项

当 \(x\to\infty\)，多项式看最高次项。

\[
7x^7+6x^5+9x+2\sim7x^7.
\]

如果开四次方：

\[
(7x^7+\cdots)^{1/4}\sim7^{1/4}x^{7/4}.
\]

### 7.2 幂型极限

遇到

\[
f(x)^{g(x)}
\]

写成

\[
e^{g(x)\ln f(x)}.
\]

先求指数里的极限。

例：

\[
x^{6/(1-x)}=e^{\frac6{1-x}\ln x}.
\]

指数极限是 \(-6\)，所以原极限是

\[
e^{-6}.
\]

### 7.3 比值趋于 1 不代表差趋于 0

例：

\[
h(x)=x+\ln x,\quad k(x)=x.
\]

\[
\frac{h(x)}{k(x)}\to1,
\]

但

\[
h(x)-k(x)=\ln x\to\infty.
\]

如果需要差趋于 0：

\[
a(x)=x+\frac{\sin x}{x},\quad b(x)=x.
\]

\[
\frac{a}{b}\to1,\quad a-b\to0,
\]

但它们不会在任何尾区间上完全相同。

---

## 8. 复数

### 8.1 基本形式

Cartesian form：

\[
z=x+iy.
\]

\[
\operatorname{Re}(z)=x,\quad \operatorname{Im}(z)=y.
\]

共轭：

\[
\bar z=x-iy.
\]

模长：

\[
|z|=\sqrt{x^2+y^2}.
\]

### 8.2 极形式

\[
z=re^{i\theta}=r(\cos\theta+i\sin\theta).
\]

\[
r=|z|.
\]

\(\theta\) 是 argument。

principal argument 通常取：

\[
-\pi<\Arg(z)\le\pi.
\]

乘法：

\[
r_1e^{i\theta_1}r_2e^{i\theta_2}
=r_1r_2e^{i(\theta_1+\theta_2)}.
\]

除法：

\[
\frac{r_1e^{i\theta_1}}{r_2e^{i\theta_2}}
=\frac{r_1}{r_2}e^{i(\theta_1-\theta_2)}.
\]

共轭：

\[
\overline{re^{i\theta}}=re^{-i\theta}.
\]

乘 \(i\)：角度加 \(\pi/2\)。

### 8.3 含 \(\bar z\) 的方程

不要套普通二次公式。

设

\[
z=x+iy,\quad \bar z=x-iy.
\]

然后分实部和虚部。

例：

\[
z^2+\bar z^2=0.
\]

\[
z^2+\bar z^2=2(x^2-y^2).
\]

所以

\[
x^2-y^2=0,
\]

\[
x=y\quad\text{or}\quad x=-y.
\]

### 8.4 单位根

\[
w^n=1.
\]

则

\[
|w|=1.
\]

如果 \(w\ne1\)，则

\[
1+w+\cdots+w^{n-1}=0.
\]

指数可以模 \(n\) 化简：

\[
w^{m+n}=w^m.
\]

### 8.5 实系数多项式

如果多项式系数全是实数，非实复根必须成共轭对出现。

如果

\[
5+2i
\]

是根，那么

\[
5-2i
\]

也是根。

重数也要相同。

---

## 9. 极坐标与参数曲线

### 9.1 极坐标是什么

普通直角坐标：

\[
(x,y).
\]

极坐标：

\[
(r,\theta).
\]

\(r\)：离原点多远。

\(\theta\)：从正 \(x\)-轴转多少角度。

转换：

\[
x=r\cos\theta,\qquad y=r\sin\theta.
\]

\[
r=\sqrt{x^2+y^2}.
\]

### 9.2 \(r<0\) 怎么办

如果 \(r<0\)，点在相反方向。

\[
(r,\theta)=(-r,\theta+\pi).
\]

### 9.3 极坐标图像题

如果给

\[
r=f(\theta),
\]

就把每个 \(\theta\) 看成一个方向，在这个方向上走 \(r\) 的距离。

如果给的是 \(r\)-vs-\(\theta\) 图，不要当作 \(xy\) 图。横轴是角度，纵轴是半径。

### 9.4 极坐标距离

离原点距离：

\[
|r|.
\]

离 \(x\)-轴距离：

\[
|y|=|r\sin\theta|.
\]

离 \(y\)-轴距离：

\[
|x|=|r\cos\theta|.
\]

所以“离 \(x\)-axis 最远”不是最大化 \(r\)，而是最大化 \(y\) 或 \(|y|\)。

### 9.5 极坐标变换

\[
r=f(\theta-a)
\]

表示逆时针旋转 \(a\)。

\[
r=f(\theta+a)
\]

表示顺时针旋转 \(a\)。

\[
r=cf(\theta)
\]

表示半径放大 \(c\) 倍。

反射：

- 关于 \(x\)-轴：

\[
\theta\mapsto-\theta.
\]

- 关于 \(y\)-轴：

\[
\theta\mapsto\pi-\theta.
\]

### 9.6 极坐标切线斜率

参数是 \(\theta\)：

\[
x(\theta)=r(\theta)\cos\theta.
\]

\[
y(\theta)=r(\theta)\sin\theta.
\]

切线斜率：

\[
\frac{dy}{dx}
=\frac{dy/d\theta}{dx/d\theta}.
\]

若

\[
r=e^{a\theta},
\]

则

\[
r'=ar.
\]

所以

\[
\frac{dy}{dx}
=\frac{a\sin\theta+\cos\theta}{a\cos\theta-\sin\theta}.
\]

### 9.7 参数曲线

参数曲线：

\[
x=x(t),\qquad y=y(t).
\]

斜率：

\[
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}.
\]

水平切线：

\[
dy/dt=0,\quad dx/dt\ne0.
\]

垂直切线：

\[
dx/dt=0,\quad dy/dt\ne0.
\]

若两者都为 \(0\)，不能直接判断。

---

## 10. 双曲函数

### 10.1 定义

\[
\sinh x=\frac{e^x-e^{-x}}2.
\]

\[
\cosh x=\frac{e^x+e^{-x}}2.
\]

\[
\tanh x=\frac{\sinh x}{\cosh x}.
\]

\[
\operatorname{sech}x=\frac1{\cosh x}.
\]

### 10.2 常用性质

\[
\sinh x\text{ is odd}.
\]

\[
\cosh x\text{ is even}.
\]

\[
\operatorname{sech}x\text{ is even}.
\]

\[
\tanh x\to1\quad(x\to\infty).
\]

\[
\operatorname{sech}x=\frac1{\cosh x}.
\]

\[
\cosh x\cdot\operatorname{sech}x=1.
\]

### 10.3 指数和双曲函数互换

\[
e^x=\cosh x+\sinh x.
\]

\[
e^{-x}=\cosh x-\sinh x.
\]

这常用于把 \(e^{ax}\) 分成 even part 和 odd part：

\[
e^{ax}=\cosh(ax)+\sinh(ax).
\]

---

## 11. Maple syntax 常用写法

向量：

```text
<1,2,-3>
```

矩阵列拼接：

```text
<<1,4>|<2,5>|<3,6>>
```

表示列向量分别是 \((1,4)^T,(2,5)^T,(3,6)^T\)。

平方根：

```text
sqrt(3)
```

\(\pi\)：

```text
Pi
```

指数：

```text
exp(x)
```

自然对数：

```text
ln(x)
```

乘法必须写 `*`：

```text
3*x
```

区间：

```text
(-infinity,18)
[0,infinity)
```

空集：

```text
{}
```

所有实数：

```text
R
```

除了某个数：

```text
not 3
```

---

## 12. 证明题 essay box 模板

### 12.1 证明连续

模板：

Let the required tolerance be given. We estimate \(|f(x)-f(a)|\). Choose a bound on \(|x-a|\) small enough so that the expression is less than the tolerance. Hence by the definition of continuity, \(f\) is continuous at \(a\).

### 12.2 用中值定理

模板：

The function is continuous on \([a,b]\) and differentiable on \((a,b)\). By the Mean Value Theorem, there exists \(c\in(a,b)\) such that

\[
\frac{f(b)-f(a)}{b-a}=f'(c).
\]

Using the given bound on \(f'\), we obtain the required inequality.

### 12.3 用介值定理

模板：

The function is continuous on \([a,b]\). Since \(f(a)\) and \(f(b)\) have opposite signs, \(0\) lies between them. By the Intermediate Value Theorem, there exists \(c\in(a,b)\) such that \(f(c)=0\).

### 12.4 用 Rolle 定理

模板：

The function is continuous on \([a,b]\) and differentiable on \((a,b)\). Also \(F(a)=F(b)\). Therefore, by Rolle's Theorem, there exists \(c\in(a,b)\) such that \(F'(c)=0\).

### 12.5 证明矩阵可逆

模板：

To prove \(M\) is invertible, it is enough to show that \(Mx=0\) only has the zero solution. Suppose \(Mx=0\). Using the given condition, we derive \(x=0\). Hence the nullspace is trivial, so \(M\) is invertible.

### 12.6 证明 orthogonal

模板：

We need to show \(B^TB=I\). Compute \(B^T\) using \((AB)^T=B^TA^T\) and \((A^{-1})^T=(A^T)^{-1}\). Then multiply \(B^TB\) and simplify to \(I\). Hence \(B\) is orthogonal.

### 12.7 证明复数是实数

模板：

Write \(z=x+iy\), where \(x,y\) are real vectors. Since the coefficient matrix is real, \(Az=Ax+iAy\). If the right hand side is real, then the imaginary part gives \(Ay=0\). If \(A\) is invertible, then \(y=0\). Therefore \(z=x\) is real.

---

## 13. 做题识别清单

看到 `A^T=-A`：

- skew-symmetric；
- 对角线为 0；
- \(x^TAx=0\)；
- 奇数阶时 \(\det A=0\)。

看到 `A^T A = I`：

- orthogonal；
- \(A^{-1}=A^T\)；
- 要证明 orthogonal 就算 \(B^TB\)。

看到 `(A|b)`：

- 行化简；
- 看矛盾行；
- 看主元和自由变量。

看到 `complex unknowns`：

- 写 \(z=x+iy\)；
- 拆成实部和虚部两个系统。

看到 `real coefficients polynomial`：

- 非实根要带共轭根。

看到 `Arg`：

- 想 principal argument；
- 通常范围是 \(-\pi<\Arg z\le\pi\)。

看到 `polar`：

- \(x=r\cos\theta\)，\(y=r\sin\theta\)；
- 离原点看 \(|r|\)；
- 离 \(x\)-axis 看 \(|r\sin\theta|\)。

看到 `improper integral`：

- 看无穷远主导项；
- 和 \(1/x^p\) 比较。

看到 `upper Riemann sum`：

- 每段取最大值；
- 单调函数看左右端点；
- 非单调函数还要看驻点。

看到 `invertible function`：

- 证明 one-to-one；
- 通常用 \(f'(x)>0\) 或 \(f'(x)<0\)。

---

## 14. 最后总复习路线

如果时间很少，按这个顺序复习：

1. 矩阵乘法、转置、逆矩阵；
2. 行化简判断解的个数；
3. 行列式和可逆；
4. 点积、叉积、平面；
5. 微积分基本定理和变上下限积分；
6. 中值定理、介值定理、Rolle 定理；
7. 反常积分比较；
8. 复数极形式、共轭根、单位根；
9. 极坐标；
10. Taylor 小量展开；
11. Riemann sums；
12. essay box 模板。

你不需要把所有公式死背。更重要的是看到题目能说：

- 这是线代还是微积分？
- 是求值还是证明？
- 是要判断存在性、可逆性、收敛性，还是图像形状？
- 我该用哪个定理？

如果这四个问题会答，大部分题就已经会做一半了。

