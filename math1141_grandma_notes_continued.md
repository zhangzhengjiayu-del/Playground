# MATH1141 奶奶也能跟着写的题型笔记：续篇

说明：这份笔记假设你从来没学过 MATH1141。每个题型都按这个顺序讲：

1. 题目在问什么；
2. 看到什么关键词该想到什么公式；
3. 怎么写答案；
4. 常见选择题该选什么。

---

## 1. Skew-symmetric 与 Orthogonal 矩阵

### 1.1 什么是 skew-symmetric

题目说

\[
A^T=-A.
\]

这叫 skew-symmetric，中文可理解为“反对称矩阵”。

最重要的两个事实：

1. 对角线元素一定是 \(0\)。

因为 \(A^T=-A\)，对角线位置满足

\[
a_{ii}=-a_{ii},
\]

所以

\[
a_{ii}=0.
\]

2. 实 skew-symmetric 矩阵满足

\[
x^TAx=0
\]

for every real vector \(x\)。

为什么？因为 \(x^TAx\) 是一个 \(1\times1\) 数，它等于自己的转置：

\[
x^TAx=(x^TAx)^T=x^TA^Tx=x^T(-A)x=-x^TAx.
\]

所以它只能是 \(0\)。

### 1.2 \(2\times2\) skew-symmetric 的样子

任何 \(2\times2\) 实 skew-symmetric 矩阵都长这样：

\[
A=
\begin{pmatrix}
0&a\\
-a&0
\end{pmatrix}.
\]

所以

\[
I+A=
\begin{pmatrix}
1&a\\
-a&1
\end{pmatrix}.
\]

行列式：

\[
\det(I+A)=1+a^2.
\]

因为 \(a\) 是实数，所以

\[
1+a^2>0.
\]

行列式不为 \(0\)，所以 \(I+A\) 一定可逆。

Essay box 可以写：

Let \(A=\begin{pmatrix}0&a\\-a&0\end{pmatrix}\). Then \(I+A=\begin{pmatrix}1&a\\-a&1\end{pmatrix}\), whose determinant is \(1+a^2\). Since \(a\in\mathbb R\), \(1+a^2>0\). Therefore \(I+A\) is invertible.

### 1.3 \(3\times3\) skew-symmetric 的选择题

任何 \(3\times3\) skew-symmetric 矩阵对角线都是 \(0\)，而且奇数阶 skew-symmetric 矩阵一定不可逆。

原因很简单：

\[
\det(A)=\det(A^T)=\det(-A)=(-1)^3\det(A)=-\det(A).
\]

所以

\[
\det(A)=-\det(A),
\]

得到

\[
\det(A)=0.
\]

因此 \(A\) never invertible。

但是 \(I+A\) always invertible。

证明方法：

假设

\[
(I+A)x=0.
\]

那么

\[
Ax=-x.
\]

左乘 \(x^T\)：

\[
x^TAx=-x^Tx.
\]

左边 \(x^TAx=0\)，所以

\[
0=-\|x\|^2.
\]

因此 \(\|x\|^2=0\)，所以 \(x=0\)。

齐次方程只有零解，所以 \(I+A\) 可逆。

正确选项：

- \(A\) is never invertible
- \(I+A\) is always invertible

### 1.4 Cayley transform：证明 \(B=(I-A)(I+A)^{-1}\) orthogonal

Orthogonal 的定义：

\[
B^TB=I.
\]

已知：

\[
A^T=-A.
\]

令

\[
B=(I-A)(I+A)^{-1}.
\]

我们要证明 \(B^TB=I\)。

第一步，先求 \(B^T\)：

\[
B^T=\left((I-A)(I+A)^{-1}\right)^T.
\]

转置乘积要反顺序：

\[
B^T=\left((I+A)^{-1}\right)^T(I-A)^T.
\]

又因为

\[
\left((I+A)^{-1}\right)^T=((I+A)^T)^{-1}.
\]

\[
(I+A)^T=I+A^T=I-A.
\]

所以

\[
\left((I+A)^{-1}\right)^T=(I-A)^{-1}.
\]

并且

\[
(I-A)^T=I-A^T=I+A.
\]

因此

\[
B^T=(I-A)^{-1}(I+A).
\]

于是

\[
B^TB=(I-A)^{-1}(I+A)(I-A)(I+A)^{-1}.
\]

关键：\(I+A\) 和 \(I-A\) 可以交换，因为它们都是 \(A\) 的多项式：

\[
(I+A)(I-A)=I-A^2=(I-A)(I+A).
\]

所以

\[
B^TB=(I-A)^{-1}(I-A)(I+A)(I+A)^{-1}=I.
\]

因此 \(B\) orthogonal。

---

## 2. 复数线性方程组：把复数拆成实部和虚部

### 2.1 核心思想

如果系数矩阵 \(A\) 全是实数，而未知量是复数：

\[
Az=w,
\]

就把

\[
z=x+iy,\qquad w=p+iq.
\]

其中 \(x,y,p,q\) 都是实向量。

因为 \(A\) 是实矩阵：

\[
A(x+iy)=Ax+iAy.
\]

所以一个复数方程等价于两个实数方程：

\[
Ax=p,\qquad Ay=q.
\]

### 2.2 计算 \(w_k=3e^{i\pi k/2}\)

用单位圆：

\[
e^{i\pi/2}=i,\quad e^{i\pi}=-1,\quad e^{3i\pi/2}=-i,\quad e^{2i\pi}=1.
\]

所以

\[
w_1=3i,\quad w_2=-3,\quad w_3=-3i,\quad w_4=3.
\]

实部向量：

\[
p=<0,-3,0,3>.
\]

虚部向量：

\[
q=<3,0,-3,0>.
\]

Maple 输入：

```text
<3,0,-3,0>
```

### 2.3 由增广矩阵判断 \(Ay=q\)

如果题目只告诉你 \((A|p)\) 的 row echelon form，但是问 \(Ay=q\)，那通常不能推出 \(Ay=q\) 的解的情况。

原因：

- \((A|p)\) 告诉你右端是 \(p\) 时发生什么；
- \((A|q)\) 是另一个增广矩阵；
- 同一个系数矩阵 \(A\)，不同右端可能一个有解、一个无解。

所以如果题目没有给 \((A|q)\) 的最后一列信息，应该选：

```text
We don't have enough information to deduce whether Ay=q has any solution or not
```

### 2.4 若 \(\alpha>11\)，实右端推出实解

题目要证明：如果 \(w_1,w_2,w_3,w_4\in\mathbb R\)，那么 \(z_1,z_2,z_3,z_4\) 都是实数。

写法：

设

\[
z=x+iy.
\]

因为 \(w\) 是实向量，所以它的虚部是 \(0\)。

方程 \(Az=w\) 拆成：

\[
Ax=w,\qquad Ay=0.
\]

只要证明 \(A\) 可逆，就有

\[
y=0.
\]

这个题里的矩阵行列式是

\[
\det(A)=1-\alpha^4.
\]

如果 \(\alpha>11\)，那么 \(\alpha^4\ne1\)，所以

\[
\det(A)\ne0.
\]

因此 \(A\) 可逆，\(Ay=0\) 只有零解，所以 \(y=0\)。于是 \(z=x\) 是实数向量。

---

## 3. 连续性、\(\epsilon\)-\(N\) 定义、偶奇函数

### 3.1 多项式 \(f(x)=5x^4+9x^2+5\)

#### 实根个数

因为

\[
5x^4\ge0,\qquad 9x^2\ge0,\qquad 5>0,
\]

所以

\[
f(x)>0
\]

对所有实数 \(x\) 成立。

所以 real roots 个数是：

```text
0
```

#### 用连续定义找 \(N\)

\[
f(x)-f(0)=5x^4+9x^2.
\]

如果

\[
|x|<\frac1n,
\]

并且 \(n\ge1\)，则 \(|x|<1\)，所以

\[
x^4<x^2.
\]

于是

\[
5x^4+9x^2<14x^2<\frac{14}{n^2}.
\]

要让它小于 \(1/k\)，只要

\[
\frac{14}{n^2}<\frac1k.
\]

也就是

\[
n^2>14k,
\]

\[
n>\sqrt{14k}.
\]

所以所有满足

```text
Any N > sqrt(14*k)
```

的选项是安全的。

如果选项写成 \(N>\sqrt[4]{14k}\)，那不够强，因为我们这里主要用的是 \(x^2\) 项。

#### 连续性 essay 模板

To prove continuity at \(0\), let \(k\ge1\) be given. Choose a natural number \(N>\sqrt{14k}\). If \(n\ge N\) and \(|x|<1/n\), then \(|x|<1\), so \(x^4<x^2\). Hence

\[
|f(x)-f(0)|=5x^4+9x^2<14x^2<14/n^2\le 14/N^2<1/k.
\]

Therefore \(f\) is continuous at \(0\).

### 3.2 Odd function on symmetric interval

函数：

\[
f(x)=x+x^{14}\sinh^5(x).
\]

判断奇偶：

- \(x\) 是 odd；
- \(x^{14}\) 是 even；
- \(\sinh x\) 是 odd；
- \(\sinh^5 x\) 仍是 odd；
- even \(\times\) odd = odd；
- odd + odd = odd。

所以 \(f\) 是 odd。

在对称区间上：

\[
\int_{-R}^{R}f(x)\,dx=0.
\]

填空：

- 积分值：`0`
- property：`odd`

选择题：

- continuous on real line：true；
- Riemann integrable on any finite interval \([a,b]\)：true；
- bounded on real line：false；
- Riemann integrable on the real line：通常 false/不合适，因为 Riemann integrable 是有限闭区间概念。

---

## 4. 分段函数与 Riemann integrable

函数：

\[
f(x)=
\begin{cases}
1/2^n,&x\in(1/2^{n+1},1/2^n],\\
0,&x=0.
\end{cases}
\]

### 4.1 哪些性质 true

它 well-defined，因为每个 \(x\in(0,1]\) 落在唯一一个区间里，\(0\) 单独定义。

它 bounded，因为所有函数值都在 \([0,1]\)。

它不是 continuous on \([0,1]\)，因为在每个分界点 \(1/2^n\) 左右函数值跳变。

它是 piecewise continuous 吗？如果课程定义要求只有有限多个分段点，则不是。因为在 \([0,1]\) 上有无限多个跳点 \(1/2,1/4,1/8,\dots\)。如果题目用标准 MATH1141 语境，通常不要选 piecewise continuous。

安全选择：

- well-defined
- bounded

### 4.2 \([t,1]\) 上有多少个 discontinuities

若

\[
t\in(1/2^{m+1},1/2^m],
\]

那么 \([t,1]\) 里包含的跳点是

\[
1/2^m,\ 1/2^{m-1},\dots,\ 1/2.
\]

一共有 \(m\) 个。

答案：

```text
m
```

### 4.3 为什么在 \([t,1]\) 上 Riemann integrable

在 \([t,1]\) 上只有有限多个跳跃不连续点，而且函数有界。因此它 Riemann integrable。

Essay 模板：

On \([t,1]\), the function has only finitely many discontinuities, namely at the dyadic points \(1/2,1/4,\dots,1/2^m\). It is bounded. A bounded function with only finitely many discontinuities on a closed interval is Riemann integrable. Hence \(f\) is Riemann integrable on \([t,1]\).

### 4.4 为什么在 \([0,1]\) 上也 integrable

虽然 \([0,1]\) 上有无限多个跳点，但它们只堆到 \(0\)。而且 \(f(x)\to0=f(0)\) as \(x\to0^+\)，所以 \(0\) 处连续。

更直观的证明：

在 \([0,1/2^m]\) 上，函数值最多 \(1/2^m\)，所以这小段面积最多

\[
\frac1{2^m}\cdot \frac1{2^m}=\frac1{4^m},
\]

可以任意小。

在剩下的 \([1/2^m,1]\) 上，只有有限多个跳点，所以可积。

所以整体可积。

积分值可以直接看每段面积：

在区间

\[
(1/2^{n+1},1/2^n]
\]

上，函数值为 \(1/2^n\)，区间长度为

\[
1/2^n-1/2^{n+1}=1/2^{n+1}.
\]

面积：

\[
\frac1{2^n}\cdot\frac1{2^{n+1}}=\frac1{2^{2n+1}}.
\]

从 \(n=0\) 开始求和：

\[
\int_0^1f(x)\,dx=\sum_{n=0}^{\infty}\frac1{2^{2n+1}}
=\frac12\sum_{n=0}^{\infty}\left(\frac14\right)^n
=\frac12\cdot\frac1{1-1/4}
=\frac23.
\]

答案：

```text
2/3
```

---

## 5. \(A^TA=0\) 和 \(CC^T=0\)

### 5.1 若 \(A^TA=0\)，那么 \(A=0\)

关键：

\[
(A^TA)_{ii}
\]

等于 \(A\) 第 \(i\) 列和自己点积，也就是该列长度平方。

如果

\[
A^TA=0,
\]

那么每一列长度平方都是 \(0\)，所以每一列都是零向量。

因此

\[
A=0.
\]

选择题：

- \(Ax=0\) 有 infinitely many solutions：true，因为零矩阵乘任何 \(x\) 都是 \(0\)；
- no solution：false；
- unique solution：false；
- A must necessarily have a zero row：true，因为整个 A 都是零矩阵；
- A is invertible：一般 false。

### 5.2 若 \(C\) 是 \(3\times31\)，且 \(CC^T=0\)

同理，

\[
CC^T=0
\]

表示 \(C\) 的每一行长度平方为 \(0\)，所以每一行都是零行。

因此

\[
C=0.
\]

方程

\[
Cx=b
\]

变成

\[
0=b.
\]

有解当且仅当

\[
b=0.
\]

可以填：

```text
<0,0,0>
```

---

## 6. 导数界、零点、反函数

题目条件：

\[
2<k'(x)<5,\qquad x\in(-6,9).
\]

### 6.1 零点个数

二次方程

\[
z^2+\mu z-\nu^2=0,\qquad \nu\ne0
\]

两个根乘积是

\[
-\nu^2<0.
\]

所以两个根一正一负。

如果 \(k(-6)\) 和 \(k(9)\) 是这两个根，那么 \(k(-6)\)、\(k(9)\) 异号。

由介值定理，至少一个零点。

又因为

\[
k'(x)>2>0,
\]

\(k\) 严格递增，所以最多一个零点。

因此：

```text
exactly one zero
```

### 6.2 最大 lower bound

已知

\[
k(-6)=-28.
\]

区间长度：

\[
9-(-6)=15.
\]

由中值定理：

\[
\frac{k(9)-k(-6)}{15}=k'(c)>2.
\]

所以

\[
\frac{k(9)+28}{15}>2.
\]

\[
k(9)+28>30.
\]

\[
k(9)>2.
\]

答案：

```text
2
```

用的定理：

```text
Mean Value Theorem
```

### 6.3 Christopher 的说法是否有效

他说因为 \(k'(x)\ge0\)，所以 \(k\) invertible。

这不够严谨。因为 \(k'(x)\ge0\) 不一定 strict increasing，比如常数函数导数为 \(0\)，但不可逆。

本题真正可用的是：

\[
k'(x)>2>0.
\]

这说明 \(k\) 严格递增，所以可逆。

所以 Christopher 的 argument：

```text
No
```

反函数图像端点：

\[
(-6,-28)\mapsto(-28,-6),
\]

\[
(9,k(9))\mapsto(k(9),9).
\]

反函数图像割线斜率：

\[
\frac{9-(-6)}{k(9)-(-28)}
=\frac{15}{k(9)+28}.
\]

题目写成

\[
\frac{\delta}{k(9)+28}.
\]

所以

```text
delta = 15
```

---

## 7. 已知 \(\int G\) 收敛，判断其他积分

条件：

\[
G:[1,\infty)\to[0,\infty)
\]

连续、非负，且

\[
\int_1^\infty G(u)\,du
\]

收敛。

### 7.1 \(\int uG(u)\,du\)

不一定收敛。

例子：

\[
G(u)=\frac1{u^2}
\]

时 \(\int G\) 收敛，但

\[
uG(u)=\frac1u
\]

发散。

所以：

```text
may converge or diverge / cannot be determined
```

### 7.2 \(\int \sqrt{G(u)}\,du\)

不一定收敛。

同样取

\[
G(u)=\frac1{u^2}.
\]

则

\[
\sqrt{G(u)}=\frac1u
\]

发散。

所以不能确定。

### 7.3 \(\int G(u^2)\,du\)

这个一定收敛。

令 \(v=u^2\)，则 \(dv=2u\,du\)，\(du=\frac{dv}{2\sqrt v}\)。

\[
\int_1^\infty G(u^2)\,du
=\int_1^\infty G(v)\frac1{2\sqrt v}\,dv.
\]

因为 \(v\ge1\)，

\[
\frac1{2\sqrt v}\le\frac12.
\]

所以

\[
G(v)\frac1{2\sqrt v}\le \frac12G(v).
\]

而 \(\int G(v)\,dv\) 收敛，所以它收敛。

### 7.4 \(\int(\sqrt{G(u)+1}-1)\,du\)

这个一定收敛。

因为

\[
\sqrt{1+G}-1=\frac{G}{\sqrt{1+G}+1}\le G.
\]

非负且被 \(G\) 控制，所以收敛。

### 7.5 \(\int G(u)^2\,du\)

不一定收敛。

虽然 \(G\) 可积，但它可能有很高很窄的尖峰，使 \(G^2\) 不可积。题目只说连续非负，不足以保证 \(G^2\) 收敛。

所以不能确定。

---

## 8. 比值极限不代表差趋于 0

### 8.1 主导项求 \(L\)

题目：

\[
\frac{\sqrt{36x^2+20\ln(\cosh x)+u(x)}}
{\sqrt{x^2+54x^\beta+v(x)}}
\]

其中 \(\beta<1\)，\(u,v\to0\)。

最高阶：

分子：

\[
\sqrt{36x^2}\sim6x.
\]

分母：

\[
\sqrt{x^2}\sim x.
\]

所以

\[
L=6.
\]

### 8.2 求差的极限

定义

\[
f(x)=\sqrt{36x^2+20\ln(\cosh x)+u(x)}.
\]

\[
g(x)=6\sqrt{x^2+54x^\beta+v(x)}.
\]

分子展开：

\[
\sqrt{36x^2+20\ln(\cosh x)}
=6x\sqrt{1+\frac{20\ln(\cosh x)}{36x^2}}.
\]

用

\[
\sqrt{1+\epsilon}=1+\epsilon/2+o(\epsilon).
\]

得到修正项：

\[
6x\cdot\frac12\cdot\frac{20\ln(\cosh x)}{36x^2}
=\frac{5}{3}\frac{\ln(\cosh x)}{x}.
\]

而

\[
\frac{\ln(\cosh x)}x\to1.
\]

所以

\[
f(x)=6x+\frac53+o(1).
\]

分母部分：

\[
g(x)=6x+o(1)
\]

因为 \(\beta<1\)。

因此

\[
\ell=\frac53.
\]

### 8.3 例子：比值趋于 1，但差趋于无穷

可以填：

```text
x+ln(x), x
```

因为

\[
\frac{x+\ln x}{x}\to1,
\]

但

\[
(x+\ln x)-x=\ln x\to\infty.
\]

### 8.4 例子：比值趋于 1，差趋于 0，但函数不最终相同

可以填：

```text
x+sin(x)/x, x
```

因为

\[
\frac{x+\sin x/x}{x}=1+\frac{\sin x}{x^2}\to1,
\]

且

\[
\left(x+\frac{\sin x}{x}\right)-x=\frac{\sin x}{x}\to0.
\]

它们在任何 \([\nu,\infty)\) 上都不完全相同，因为 \(\sin x/x\) 会不断不为 \(0\)。

---

## 9. 三对角矩阵 \(G_n\) 的行列式递推

\[
G_3=
\begin{pmatrix}
1&p&0\\
q&1&p\\
0&q&1
\end{pmatrix}.
\]

沿第一行展开：

\[
\det G_3
=1\cdot
\det\begin{pmatrix}1&p\\q&1\end{pmatrix}
-p\cdot
\det\begin{pmatrix}q&p\\0&1\end{pmatrix}.
\]

所以

\[
M=
\begin{pmatrix}
1&p\\
q&1
\end{pmatrix},
\qquad
r=-p.
\]

Maple：

```text
<<1|p>,<q|1>>
```

and

```text
-p
```

一般递推：

\[
\det G_n=\det G_{n-1}-pq\det G_{n-2}.
\]

所以

```text
x = 1
y = -p*q
```

---

## 10. 方程 \(z^2+\bar z^2=0\)

设

\[
z=x+iy.
\]

则

\[
z^2=(x^2-y^2)+2ixy,
\]

\[
\bar z^2=(x^2-y^2)-2ixy.
\]

相加：

\[
z^2+\bar z^2=2(x^2-y^2).
\]

等于 \(0\) 当且仅当

\[
x^2-y^2=0.
\]

即

\[
(x-y)(x+y)=0.
\]

所以

\[
x=y\quad\text{or}\quad x=-y.
\]

也就是

\[
\operatorname{Re}(z)=\operatorname{Im}(z)
\]

or

\[
\operatorname{Re}(z)=-\operatorname{Im}(z).
\]

### 10.1 Arg 和 modulus

解集是两条直线：

\[
y=x,\qquad y=-x.
\]

不包括 \(z=0\) 时 Arg 才有定义。

可能的 principal arguments：

\[
\frac\pi4,\quad -\frac{3\pi}{4},\quad -\frac\pi4,\quad \frac{3\pi}{4}.
\]

集合输入：

```text
{-3*Pi/4,-Pi/4,Pi/4,3*Pi/4}
```

模长可以是任何非负数，因为 \(z=0\) 也是解：

```text
[0,infinity)
```

### 10.2 方程 \(z^{4k}=-|z^{4k}|\)

右边是非正实数。如果 \(z\ne0\)，这表示 \(z^{4k}\) 在负实轴上。

令

\[
z=re^{i\theta}.
\]

则

\[
z^{4k}=r^{4k}e^{i4k\theta}.
\]

要在负实轴上：

\[
4k\theta\equiv \pi\pmod{2\pi}.
\]

所以

\[
\theta=\frac{(2j+1)\pi}{4k}.
\]

在 \(-\pi<\theta\le\pi\) 中一共有

\[
4k
\]

个方向。

固定 \(|z|=7\) 或 \(|z|=9\) 后，有 \(4k\) 个点均匀分布在圆上。

相邻角度差：

\[
\frac{2\pi}{4k}=\frac{\pi}{2k}.
\]

圆弧最短距离：

\[
r\cdot\frac{\pi}{2k}.
\]

若半径 \(7\)：

```text
7*Pi/(2*k)
```

若半径 \(9\)：

```text
9*Pi/(2*l)
```

---

## 11. 复数除法与实系数多项式

### 11.1 计算 \(z=\frac{\sqrt3+i}{1+i\sqrt3}\)

分子：

\[
\sqrt3+i
\]

模长：

\[
\sqrt{3+1}=2,
\]

角度：

\[
\pi/6.
\]

分母：

\[
1+i\sqrt3
\]

模长：

\[
2,
\]

角度：

\[
\pi/3.
\]

所以商：

\[
z=e^{i(\pi/6-\pi/3)}=e^{-i\pi/6}.
\]

模长：

```text
1
```

principal argument：

```text
-Pi/6
```

### 11.2 \(\frac{\sqrt3+i\lambda}{1+i\sqrt3}\) 什么时候是实数

乘以分母共轭：

\[
\frac{\sqrt3+i\lambda}{1+i\sqrt3}
\cdot\frac{1-i\sqrt3}{1-i\sqrt3}.
\]

分母是 \(4\)。

分子：

\[
(\sqrt3+i\lambda)(1-i\sqrt3)
=\sqrt3-3i+i\lambda+\lambda\sqrt3.
\]

虚部系数：

\[
\lambda-3.
\]

要是实数：

\[
\lambda-3=0.
\]

所以

```text
3
```

### 11.3 多项式系数能否唯一确定

多项式：

\[
p(z)=z^5+a_4z^4+a_3z^3+a_2z^2+a_1z+1.
\]

未知数 \(a_1,\dots,a_4\) 有 4 个。

若只知道两个复根 \(z_1,z_2\)，并且系数允许是复数，那么

\[
p(z_1)=0,\quad p(z_2)=0
\]

只是两个复线性条件，对四个未知复系数不够，所以不能唯一确定。

答案：No。

若额外知道 \(a_1,\dots,a_4\) 都是实数：

非实根成共轭对出现。所以除了 \(z_1=5+2i\)、\(z_2=1-3i\)，还知道

\[
\bar z_1=5-2i,\qquad \bar z_2=1+3i
\]

也是根。

这是 4 个根。首项系数是 \(1\)，常数项是 \(1\)。因此多项式必须是

\[
(z-z_1)(z-\bar z_1)(z-z_2)(z-\bar z_2)(z-r)
\]

其中常数项条件决定唯一的实根 \(r\)。

所以可以唯一确定。

答案：Yes。

---

## 12. 共线、线性变换和投影

### 12.1 三点共线

点 \((2,2)\)、\((-2,-3)\) 的方向向量：

\[
(-2,-3)-(2,2)=(-4,-5).
\]

所以共线点形如

\[
(2,2)+t(-4,-5).
\]

检查选项：

- \((2,2)\)：不行，因为题目说 distinct；
- \((0,-1)\)：从 \((2,2)\) 到它是 \((-2,-3)\)，不是 \((-4,-5)\) 的倍数；
- \((-6,-8)\)：从 \((2,2)\) 到它是 \((-8,-10)=2(-4,-5)\)，可以；
- \((6,7)\)：从 \((2,2)\) 到它是 \((4,5)=-1(-4,-5)\)，可以；
- \((4,5)\)：从 \((2,2)\) 到它是 \((2,3)\)，不可以。

正确：

```text
(-6,-8), (6,7)
```

### 12.2 线性变换矩阵

给

\[
v=<-5,2,11>,\qquad w=<6,-10,2>.
\]

若

\[
A\binom ab=av+bw,
\]

那么 \(A\) 的第一列是 \(v\)，第二列是 \(w\)。

所以

```text
<<-5|6>,<2|-10>,<11|2>>
```

或

```text
<<-5,2,11>|<6,-10,2>>
```

### 12.3 线性变换保持共线

如果 \(x,y,z\) 共线，那么

\[
z-x
\]

和

\[
z-y
\]

是 parallel。

线性变换 \(A\) 满足：

\[
A(z-x)=Az-Ax.
\]

如果 \(z-x\) 和 \(z-y\) 平行，那么它们的像也平行。因此 \(Ax,Ay,Az\) 仍共线。

### 12.4 投影缩放

投影公式：

\[
\operatorname{proj}_b(v)=\frac{v\cdot b}{b\cdot b}b.
\]

给定

\[
\operatorname{proj}_b(v)=<5,11>.
\]

性质：

1. 投影对被投影向量线性：

\[
\operatorname{proj}_b(cv)=c\operatorname{proj}_b(v).
\]

所以

\[
\operatorname{proj}_b(12v)=12<5,11>=<60,132>.
\]

2. 若方向向量缩放，投影不变：

\[
\operatorname{proj}_{12b}(v)=\operatorname{proj}_b(v)=<5,11>.
\]

3. 投影到 \(b\) 上的结果一定在 \(b\) 方向。因为已知 \(\operatorname{proj}_b(v)=<5,11>\)，所以 \(b\) 与 \(<5,11>\) 平行。

若加上向量

\[
<1050,850>=170<5,11>.
\]

它本身就在 \(b\) 方向，所以投影就是自己。

\[
\operatorname{proj}_b(v+<1050,850>)
=<5,11>+<1050,850>
=<1055,861>.
\]

---

## 13. \(\mathbb R^4\) 中直线、平面、法向空间

### 13.1 直线 \(L\)

条件：

\[
x_1=6,\quad x_2=7,\quad x_3-2x_4=3.
\]

令参数 \(s=x_4\)，则

\[
x_3=3+2s.
\]

所以

```text
<6,7,3+2*s,s>
```

或

```text
<6,7,3,0>+s*<0,0,2,1>
```

### 13.2 平面 \(\Pi\)

条件：

\[
x_1-2x_2-2x_3=8,
\]

\[
x_4-3x_3=10.
\]

令

\[
x_2=s,\quad x_3=t.
\]

则

\[
x_1=8+2s+2t,
\]

\[
x_4=10+3t.
\]

所以

```text
<8+2*s+2*t,s,t,10+3*t>
```

或

```text
<8,0,0,10>+s*<2,1,0,0>+t*<2,0,1,3>
```

### 13.3 判断 \(L\) 和 \(\Pi\) 是否相交

Maple 给的增广矩阵化简中如果出现矛盾行，比如

\[
0= -17/2
\]

或其他非零数，就表示联立无解。

所以 line \(L\) does not intersect plane \(\Pi\)。

### 13.4 normals to a plane in \(\mathbb R^4\)

\(\Pi\) 由两个方程定义，所以它的 normal vectors 来自这两个方程的系数：

\[
n_1=<1,-2,-2,0>,
\]

\[
n_2=<0,0,-3,1>.
\]

所有 normal vectors 构成

\[
U=\operatorname{span}\{n_1,n_2\}.
\]

几何上 \(U\) 是一个 plane passing through the origin。

填空：

```text
plane
origin
```

---

## 14. Maple 输出可能骗人：\(\arccos(\sin(ax))\)

\(\arccos\) 的输出范围是

\[
[0,\pi].
\]

所以

\[
\arccos(\sin(ax))
\]

不是一条全局直线，而是折线/三角波形。

Maple 说二阶导数是 \(0\)，通常只是在某些分段内部成立，不代表整个函数在所有实数上都是同一条直线。

Channelle 错在：

1. 忽略了 \(\arccos\) 的主值范围；
2. 忽略了函数在不同区间有不同表达式；
3. 从局部二阶导数为 \(0\) 推出全局 \(h(x)=cx+b\) 是错误的。

### 14.1 \(g(x)=\arccos(3q\sin(ax))\) 的 domain

要让 \(D=\mathbb R\)，必须对所有 \(x\)，有

\[
-1\le3q\sin(ax)\le1.
\]

因为 \(\sin(ax)\in[-1,1]\)，所以需要

\[
|3q|\le1.
\]

\[
|q|\le\frac13.
\]

答案：

```text
[-1/3,1/3]
```

### 14.2 什么时候在全 \(\mathbb R\) differentiable

\(\arccos u\) 在 \(u=\pm1\) 处导数爆掉。若 \(|3q|<1\)，里面永远不到 \(\pm1\)，所以可导。

若 \(|3q|=1\)，会在某些点达到 \(\pm1\)，不可导。

所以：

```text
(-1/3,1/3)
```

---

## 15. 反常积分比较：复杂函数看主导项

题目中

\[
f(x)=17\arctan(x)+13x\tanh(x)+d(x^4-78x^3+\cdots)^{5/780}.
\]

当 \(x\to\infty\)：

\[
\arctan x\to\pi/2,
\]

所以

\[
\frac{\arctan x}{x}\to0.
\]

\[
\tanh x\to1.
\]

因此

\[
\frac{\arctan(x)}x+\alpha\tanh x\to \alpha.
\]

在 \(f(x)\) 中最大的增长来自

\[
13x\tanh x\sim13x.
\]

另一个多项式项：

\[
(x^4+\cdots)^{5/780}\sim x^{20/780}=x^{1/39},
\]

比 \(x\) 小很多。

所以可以选

\[
g(x)=13x.
\]

即

```text
p = 13
q = 1
```

因为

\[
\int_{184}^{\infty}13x\,dx
\]

发散，所以由 limit comparison test，原积分发散。

\(p\) 是否唯一？

若要

\[
\lim\frac{f}{g}
\]

是正的有限常数，\(g=px\) 中任何 \(p>0\) 都可以。极限会是 \(13/p\)。

所以选：

```text
p can be any positive real number
```

---

## 16. 线性方程组概念题

### 16.1 \(y\in span(a_1,\dots,a_{92})\)

矩阵 \(A\) 的列就是 \(a_1,\dots,a_{92}\)。

\[
Ax
\]

就是这些列向量的线性组合。

所以

\[
y\in span(a_1,\dots,a_{92})
\]

等价于 \(Ax=y\) 有至少一个解。

正确：

```text
If y in span(...) then Ax=y has at least one solution.
```

不一定唯一，因为列很多，可能有自由变量。

### 16.2 \(d\) 是 \(3\times3\) 矩阵 \(B\) 的 determinant

题目给的 \(d\) 是沿第一行展开的 \(\det(B)\)。

若 \(d=0\)，只知道 \(B\) 不可逆。此时 \(Bx=b\) 可能无解，也可能无穷多解，不能确定。

正确：

```text
None of the other options is necessarily true.
```

若 \(d\ne0\)，则 \(B\) 可逆，所以对每个 \(b\)，\(Bx=b\) 有唯一解。

正确：

```text
If d != 0 then Bx=b has exactly one solution.
```

### 16.3 齐次方程 \(Cx=0\)

\(C\) 是 \(3\times4\) 矩阵。未知数 4 个，方程最多 3 个。

所以一定有自由变量，齐次方程一定有非零解。

因此解集不是只有 \(0\)，而是一个至少一维的 subspace。

如果题目问 \(p=7\)、\(p=-6\) 时 \(D=\{x:Cx=0\}\) 的形状，从计算可知两者 rank 都是 3，所以 nullity 是 1。

因此：

```text
a line through the origin
```

---

## 17. Julie's rule / L'Hopital 逻辑

### 17.1 不能反向推断

Julie 的 rule 是洛必达法则的一种形式：

如果导数比极限存在，那么函数比极限等于它。

但如果导数比极限不存在，不能推出函数比极限不存在。

这是逻辑错误：

\[
P\Rightarrow Q
\]

不代表

\[
\neg P\Rightarrow \neg Q.
\]

答案：

```text
incorrect / false
```

### 17.2 Julie's conjecture

条件：

\[
\lim\frac{k'}{g'}=c\ne0
\]

存在。

由洛必达：

\[
\lim\frac{k}{g}=c\ne0.
\]

如果反过来假设

\[
\lim\frac{k}{f}
\]

存在，那么

\[
\frac{g}{f}=\frac{g}{k}\cdot\frac{k}{f}
\]

也会存在，因为

\[
\frac{g}{k}\to1/c.
\]

这和题设 \(\lim g/f\) 不存在矛盾。

所以 conjecture true。

### 17.3 分段函数 \(F(x)=\frac{e^{x^p}-1}{x^n}\)

当 \(x\to0\)：

\[
e^{x^p}-1\sim x^p.
\]

所以

\[
F(x)\sim x^{p-n}.
\]

分情况：

- \(n<p\)：极限 \(0\)，取 \(b=0\) 连续；
- \(n=p\)：极限 \(1\)，取 \(b=1\) 连续；
- \(n>p\)：发散，无法连续。

临界值：

```text
N = p
```

若 \(p=77\)，两组答案可写：

```text
[76,0], [77,1]
```

---

## 18. 幂零矩阵 \(T\)

题目里的 \(T\) 是严格上三角矩阵：对角线和下方都是 \(0\)。

### 18.1 powers of \(T\)

严格上三角矩阵的性质：

\[
T^k
\]

的非零元素只能出现在至少第 \(k\) 条上对角线及更上方。

意思是：\((i,j)\) 若想可能非零，需要

\[
j-i\ge k.
\]

所以：

- \((n,n)\) of \(T^3\)：\(j-i=0<3\)，是 0；
- \((n-2,n)\) of \(T^3\)：\(j-i=2<3\)，是 0；
- \((1,n)\) of \(T^{n-1}\)：\(j-i=n-1\)，可能非零，不选；
- \((4,8)\) of \(T^3\)：\(j-i=4\ge3\)，可能非零，不选；
- \((3,4)\) of \(T^2\)：\(j-i=1<2\)，是 0；
- \((1,n-1)\) of \(T^{n-1}\)：\(j-i=n-2<n-1\)，是 0。

### 18.2 determinants

严格上三角矩阵 \(T\) 对角线全是 \(0\)，所以

\[
\det T=0.
\]

\(I-T\) 是上三角，对角线全是 \(1\)，所以

\[
\det(I-T)=1.
\]

正确：

- \(\det(I-T)=1\)
- \(\det T=0\)

### 18.3 \(I-11T\) 可逆

因为 \(T\) nilpotent，也就是

\[
T^n=0.
\]

几何级数公式：

\[
(I-11T)^{-1}=I+11T+(11T)^2+\cdots+(11T)^{n-1}.
\]

---

## 19. 对数螺线 \(r=e^{4\theta/31}\)

### 19.1 判断点在曲线上

给的复数：

\[
z=\left(\frac{\sqrt3}{2}-\frac{i}{2}\right)e^{-2\pi/93}.
\]

括号部分是

\[
e^{-i\pi/6}.
\]

所以这个点的角度可以取

\[
\theta=-\pi/6.
\]

半径是

\[
r=e^{-2\pi/93}.
\]

而曲线要求

\[
r=e^{4\theta/31}.
\]

代入 \(\theta=-\pi/6\)：

\[
e^{4(-\pi/6)/31}=e^{-2\pi/93}.
\]

吻合，所以在曲线上。

### 19.2 圆 \(r=24\) 与曲线交点

\[
e^{4\theta/31}=24
\]

有唯一实数 \(\theta\) 解，如果按极坐标参数 \(\theta\in\mathbb R\) 看，每 \(2\pi\) 转一圈半径会改变，不会回到同一半径。

所以 circle radius 24 has a unique point of intersection。

### 19.3 powers and conjugates

如果 \(z\) 在曲线上，写成

\[
z=e^{a\theta}e^{i\theta},\quad a=4/31.
\]

那么

\[
z^n=e^{na\theta}e^{in\theta}.
\]

令新角度

\[
\phi=n\theta.
\]

则半径

\[
e^{na\theta}=e^{a\phi}.
\]

所以 \(z^n\) 也在曲线上。

正确：

```text
If z lies on C, then z^n also lies on C for all positive integers n.
```

共轭对应角度 \(-\theta\)，半径不变。但曲线在角度 \(-\theta\) 的半径应为 \(e^{-a\theta}\)，一般不等于 \(e^{a\theta}\)。所以存在点使共轭不在曲线上。

正确：

```text
There exists some z on C such that conjugate z does not lie on C.
```

### 19.4 极坐标切线斜率

极坐标：

\[
x=r\cos\theta,\qquad y=r\sin\theta.
\]

若 \(r=e^{a\theta}\)，则

\[
r'=ar.
\]

切线斜率：

\[
\frac{dy}{dx}
=\frac{r'\sin\theta+r\cos\theta}{r'\cos\theta-r\sin\theta}
=\frac{a\sin\theta+\cos\theta}{a\cos\theta-\sin\theta}.
\]

这里

\[
a=\frac4{31},\quad \theta=\frac\pi4.
\]

因为 \(\sin\theta=\cos\theta\)，

\[
m=\frac{a+1}{a-1}
=\frac{4/31+1}{4/31-1}
=\frac{35/31}{-27/31}
=-\frac{35}{27}.
\]

Maple：

```text
-35/27
```

---

## 20. 偶奇分解与积分等于 \(\pi\)

函数：

\[
f(x)=\frac{e^{6x}\operatorname{sech}(6x)}{\sqrt{64-x^2}}.
\]

### 20.1 为什么既不是 odd 也不是 even

分母 \(\sqrt{64-x^2}\) 是 even。

\(\operatorname{sech}(6x)\) 是 even。

但 \(e^{6x}\) 既不是 even 也不是 odd。

所以整体一般既不是 even 也不是 odd。

也可以直接说：

\[
f(-x)=\frac{e^{-6x}\operatorname{sech}(6x)}{\sqrt{64-x^2}},
\]

它既不等于 \(f(x)\)，也不等于 \(-f(x)\)。

### 20.2 把 \(e^{6x}\) 分成 even + odd

任何函数的 even part：

\[
h(x)=\frac{F(x)+F(-x)}2.
\]

odd part：

\[
k(x)=\frac{F(x)-F(-x)}2.
\]

对 \(F(x)=e^{6x}\)：

\[
h(x)=\frac{e^{6x}+e^{-6x}}2=\cosh(6x).
\]

\[
k(x)=\frac{e^{6x}-e^{-6x}}2=\sinh(6x).
\]

### 20.3 分解 integrand

\[
e^{6x}\operatorname{sech}(6x)
=\left(\cosh(6x)+\sinh(6x)\right)\operatorname{sech}(6x).
\]

因为

\[
\cosh(6x)\operatorname{sech}(6x)=1.
\]

所以 even part：

\[
h_2(x)=\frac1{\sqrt{64-x^2}}.
\]

odd part：

\[
k_2(x)=\frac{\sinh(6x)\operatorname{sech}(6x)}{\sqrt{64-x^2}}
=\frac{\tanh(6x)}{\sqrt{64-x^2}}.
\]

### 20.4 为什么积分等于 \(\pi\)

在 \([-8,8]\) 上，odd part 积分为 \(0\)。

所以

\[
\int_{-8}^{8}f(x)\,dx
=\int_{-8}^{8}\frac1{\sqrt{64-x^2}}\,dx.
\]

这个积分是半径 \(8\) 的上半圆相关标准积分：

\[
\int_{-a}^{a}\frac1{\sqrt{a^2-x^2}}dx=\pi.
\]

所以答案是

\[
\pi.
\]

---

## 21. 三角幂展开

### 21.1 \(\cos^n x\) 的 constant term

若 \(n\) 是偶数，

\[
\cos x=\frac{e^{ix}+e^{-ix}}2.
\]

\[
\cos^n x=\frac1{2^n}(e^{ix}+e^{-ix})^n.
\]

常数项来自选一半 \(e^{ix}\)、一半 \(e^{-ix}\)：

\[
\frac1{2^n}\binomial(n,n/2).
\]

Maple：

```text
binomial(n,n/2)/2^n
```

### 21.2 \(\sin^{789}x\cos^n x\)

用积化和差，\(\sin\) 乘 \(\cos\) 的组合可以写成很多 \(\sin(kx)\) 的线性组合。

最高频率来自：

\[
\sin^{789}x
\]

最高频率 \(789x\)，以及

\[
\cos^n x
\]

最高频率 \(nx\)。

所以会出现 \(\sin((789+n)x)\)，不会出现 \(\sin((790+n)x)\)。

因此：

- coefficient of \(\sin((790+n)x)\)：`0`

最高项系数：

\[
\sin^{789}x
\]

最高频率系数是

\[
\frac{(-1)^{(789-1)/2}}{2^{788}}
\]

因为 \(789\equiv1\pmod4\)，符号为 positive。

\[
\cos^n x
\]

最高频率 \(\cos(nx)\) 系数是

\[
\frac{1}{2^{n-1}}.
\]

乘积 \(\sin(789x)\cos(nx)\) 会给

\[
\frac12\sin((789+n)x)+\cdots.
\]

所以 coefficient of \(\sin((789+n)x)\)：

\[
\frac1{2^{788}}\cdot\frac1{2^{n-1}}\cdot\frac12
=\frac1{2^{n+788}}.
\]

coefficient of \(\sin((787+n)x)\) 来自 \(\sin^{789}\) 的下一项和 \(\cos^n\) 的最高项，具体较容易算错；考试时建议从 exponential/binomial 展开系统取对应频率。

---

## 22. Riemann sums：递减、线性、凹凸

\[
J=\int_6^9f(x)\,dx.
\]

### 22.1 \(f'<0\)，比较 \(D=f(6)+f(7)+f(8)\)

区间分成：

\[
[6,7],[7,8],[8,9].
\]

递减函数每段左端点最大，所以左端点和高估积分。

\[
D>J.
\]

所以：

```text
J < D
```

### 22.2 \(f'<0\)，比较中点和 \(C\)

只知道递减，不能判断中点和高估还是低估。

答案：

```text
There is not enough information
```

### 22.3 \(f''=0\)

函数是线性的。中点法对线性函数精确。

\[
J=C.
\]

### 22.4 \(f''<0\)

函数 concave down。对 concave down，中点值高于平均值，所以中点和高估。

\[
C>J.
\]

所以：

```text
J < C
```

---

## 23. 向量比例点

已知

\[
\vec{AB}=84a,\qquad \vec{AO}=126b.
\]

### 23.1 求 \(\vec{OB}\)

\[
\vec{OB}=\vec{OA}+\vec{AB}-\vec{OA}-\vec{AO}
=\vec{AB}-\vec{AO}.
\]

所以

\[
\vec{OB}=84a-126b.
\]

Maple：

```text
84*a-126*b
```

### 23.2 求 \(\vec{PQ}\)

设 \(A\) 为原点方便想。

\[
B=84a,\qquad O=126b.
\]

P 在 \(AO\) 上，比例 \(AP:PO=5:1\)，所以

\[
P=A+\frac56(AO)=105b.
\]

Q 在 \(BO\) 上，比例 \(BQ:QO=5:2\)，所以

\[
Q=B+\frac57(O-B).
\]

\[
Q=84a+\frac57(126b-84a)
=84a-60a+90b
=24a+90b.
\]

所以

\[
\vec{PQ}=Q-P=24a+90b-105b=24a-15b.
\]

Maple：

```text
24*a-15*b
```

### 23.3 判断 P,Q,C 共线

B 是 AC 的 midpoint，所以

\[
C=2B-A.
\]

若 \(A=0\)，则

\[
C=168a.
\]

\[
\vec{PC}=168a-105b.
\]

\[
\vec{PQ}=24a-15b.
\]

注意：

\[
168a-105b=7(24a-15b).
\]

所以 \(\vec{PC}\) 与 \(\vec{PQ}\) 平行，P,Q,C 共线。

---

## 24. Improper integrals with substitutions

### 24.1 \(I_1=\int x^{17}(x-4)^a dx\)

要变成

\[
\int(u+4)^{17}u^a\,du,
\]

令

\[
u=x-4.
\]

答案：

```text
x-4
```

对于

\[
J_1=\int_6^\infty x^{17}(x-4)^a dx,
\]

当 \(x\to\infty\)，它像

\[
x^{17+a}.
\]

\[
\int^\infty x^p dx
\]

收敛当且仅当 \(p<-1\)。

所以收敛条件：

\[
17+a<-1\Rightarrow a<-18.
\]

发散条件：

\[
a\ge -18.
\]

答案：

```text
[-18,infinity)
```

### 24.2 \(\int \frac{(\ln(x+7))^\alpha}{x+7}dx\)

令

\[
t=\frac15\ln(x+7)
\]

则

\[
dt=\frac1{5(x+7)}dx.
\]

\[
\frac{dx}{x+7}=5dt.
\]

且

\[
\ln(x+7)=5t.
\]

所以

\[
\int\frac{(\ln(x+7))^\alpha}{x+7}dx
=5^{\alpha+1}\int t^\alpha dt.
\]

答案：

```text
ln(x+7)/5
```

### 24.3 \(J_2\) 收敛条件

\[
J_2=\int_0^\infty\frac{(\ln(x+7))^{p-19}}{x+23}dx.
\]

当 \(x\to\infty\)，像

\[
\int^\infty \frac{(\ln x)^{p-19}}{x}dx.
\]

令 \(u=\ln x\)，得到

\[
\int^\infty u^{p-19}du.
\]

收敛当且仅当

\[
p-19<-1.
\]

\[
p<18.
\]

答案：

```text
(-infinity,18)
```

### 24.4 \(I_3\) 用 \(u=1/x\)

\[
I_3=\int_0^1
\frac{\arctan(5x)}
{x^{n-10}(3x+1)^{n-8}}dx.
\]

真正危险点是 \(x=0\)。

当 \(x\to0\)：

\[
\arctan(5x)\sim5x,
\]

\[
(3x+1)^{n-8}\sim1.
\]

所以 integrand 像

\[
\frac{5x}{x^{n-10}}=5x^{11-n}.
\]

\[
\int_0 x^p dx
\]

在 \(p>-1\) 时收敛。

所以

\[
11-n>-1.
\]

\[
n<12.
\]

若 \(n\) 是整数/自然数，则：

```text
(-infinity,12)
```

若题目只允许 integer \(n\)，就理解为 \(n\le11\)。

---

## 25. 三角形、外心、正四面体点

点：

\[
A=(0,-10,3),\quad B=(2,-8,7),\quad C=(-2,-6,x).
\]

### 25.1 求 \(x\)：C 到 A 和 B 等距

条件：

\[
|C-A|=|C-B|.
\]

平方避免根号：

\[
|C-A|^2=|C-B|^2.
\]

\[
C-A=(-2,4,x-3).
\]

\[
C-B=(-4,2,x-7).
\]

所以

\[
4+16+(x-3)^2=16+4+(x-7)^2.
\]

\[
(x-3)^2=(x-7)^2.
\]

\[
x=5.
\]

### 25.2 平面 \(\Pi\)

现在

\[
C=(-2,-6,5).
\]

取基点 \(A\)。

\[
AB=(2,2,4),
\]

\[
AC=(-2,4,2).
\]

平面：

```text
<0,-10,3>+s*<2,2,4>+t*<-2,4,2>
```

三个点不共线，所以平面 uniquely determined：Yes。

### 25.3 normal vector

\[
n=AB\times AC.
\]

计算：

\[
(2,2,4)\times(-2,4,2)=(-12,-12,12).
\]

可以简化为

```text
<1,1,-1>
```

或任何非零倍数。

### 25.4 到 A,B,C 等距的点 P

在三角形平面内，和三个顶点等距的点是 circumcenter。

本题计算得到：

\[
P=(0,-8,5).
\]

Maple：

```text
<0,-8,5>
```

怎么解释：

找两条边的垂直平分线的交点，或设

\[
P=A+uAB+vAC
\]

并解

\[
|P-A|=|P-B|,\qquad |P-A|=|P-C|.
\]

得到 \(u=v=1/3\)，所以

\[
P=A+\frac13AB+\frac13AC=(0,-8,5).
\]

### 25.5 找 D 使 A,B,C,D 两两等距

D 要在过 P 且垂直于平面 \(\Pi\) 的直线上：

\[
D=P+\lambda n.
\]

选择 \(\lambda\) 使

\[
|D-A|=|A-B|.
\]

因为 P 已经到 A,B,C 等距，沿 normal 方向上下走到合适高度即可。

D 不唯一：有两个点，一个在平面上方，一个在下方。

答案：No，not unique。

---

## 26. 行列式函数 + Rolle 定理

给

\[
F(x)=\det
\begin{pmatrix}
f(x)&g(x)&x^2+3\\
f(-1)&g(-1)&4\\
f(2)&g(2)&7
\end{pmatrix}.
\]

### 26.1 找 \(F(x)=0\)

当 \(x=-1\) 时，第一行和第二行相同：

\[
(f(-1),g(-1),4).
\]

两行相同，行列式为 \(0\)。

所以可以填：

```text
-1
```

也可以填 \(2\)，因为 \(x=2\) 时第一行和第三行相同。

### 26.2 证明存在 \(c\) 使 \(F'(c)=0\)

因为 \(f,g\) 连续且可导，\(F\) 也是连续且可导。

我们已经知道：

\[
F(-1)=0,\qquad F(2)=0.
\]

所以

\[
F(-1)=F(2).
\]

由 Rolle's Theorem，存在

\[
c\in(-1,2)
\]

使

\[
F'(c)=0.
\]

Essay 模板：

Since \(f\) and \(g\) are continuous on \([-1,2]\) and differentiable on \((-1,2)\), the determinant expression \(F\) is also continuous on \([-1,2]\) and differentiable on \((-1,2)\). At \(x=-1\), the first and second rows of the matrix are equal, so \(F(-1)=0\). At \(x=2\), the first and third rows are equal, so \(F(2)=0\). Hence \(F(-1)=F(2)\). By Rolle's theorem, there exists \(c\in(-1,2)\) such that \(F'(c)=0\).

---

## 27. Set \(A\) on unit circle with rational angle

\[
A=\{u\in\mathbb C:|u|^2=1,\ \arg(u)=q\pi\text{ for some }q\in\mathbb Q\}.
\]

也就是单位圆上角度是“有理数倍 \(\pi\)”的点。

### 27.1 乘法封闭

若

\[
u=e^{iq_1\pi},\qquad v=e^{iq_2\pi},
\]

其中 \(q_1,q_2\in\mathbb Q\)，则

\[
uv=e^{i(q_1+q_2)\pi}.
\]

有理数相加仍是有理数，所以 \(uv\in A\)。

### 27.2 乘法结合律、交换律

因为 \(A\subset\mathbb C\)，而复数乘法本来就是 associative and commutative，所以 \(A\) 继承这些性质。

### 27.3 乘法单位元

单位元是

\[
1=e^{i0\pi}.
\]

因为 \(0\in\mathbb Q\)，且 \(|1|=1\)，所以 \(1\in A\)。

### 27.4 乘法逆元

若

\[
u=e^{iq\pi},
\]

则

\[
u^{-1}=e^{-iq\pi}.
\]

因为 \(-q\in\mathbb Q\)，所以 \(u^{-1}\in A\)。

### 27.5 是否是 field

不是 field。

原因：field 还需要对加法封闭。但 \(A\) 不在加法下封闭。

例如

\[
1\in A,\qquad i\in A,
\]

但

\[
1+i
\]

模长是 \(\sqrt2\)，不在单位圆上，所以不在 \(A\)。

因此 \(A\) with complex addition and multiplication is not a field。

---

## 28. 隐式/参数曲线与双曲函数

曲线：

\[
x(t)=\ln(\sqrt{t^{10}+1}+t^5).
\]

这是

\[
\operatorname{arsinh}(t^5).
\]

因为

\[
\operatorname{arsinh}(u)=\ln(u+\sqrt{u^2+1}).
\]

所以

\[
x=\operatorname{arsinh}(t^5).
\]

### 28.1 \(x(t)\) increasing

Maple 给：

\[
x'(t)=\frac{5t^4}{\sqrt{t^{10}+1}}.
\]

它总是 \(\ge0\)，只在 \(t=0\) 为 \(0\)。由于 \(t^5\) increasing，\(\operatorname{arsinh}\) increasing，所以 \(x(t)\) increasing。

### 28.2 \(x(t)\) odd

计算：

\[
x(-t)=\ln(\sqrt{t^{10}+1}-t^5).
\]

\[
x(t)+x(-t)
=\ln[(\sqrt{t^{10}+1}+t^5)(\sqrt{t^{10}+1}-t^5)].
\]

括号乘积等于 \(1\)，所以

\[
x(t)+x(-t)=\ln1=0.
\]

因此

\[
x(-t)=-x(t).
\]

### 28.3 求 inverse \(t(x)\)

\[
x=\operatorname{arsinh}(t^5).
\]

两边取 sinh：

\[
\sinh x=t^5.
\]

所以

\[
t=(\sinh x)^{1/5}.
\]

Maple：

```text
(sinh(x))^(1/5)
```

### 28.4 切线 at \(t=0\)

\[
x(0)=\ln1=0.
\]

\[
y(0)=1-0-4=-3.
\]

用 Maple 给的导数：

\[
y'(t)=\frac{-5t^4(-t^5+\sqrt{t^{10}+1})}{\sqrt{t^{10}+1}},
\]

\[
x'(t)=\frac{5t^4}{\sqrt{t^{10}+1}}.
\]

对 \(t\ne0\)，

\[
\frac{dy}{dx}
=-(-t^5+\sqrt{t^{10}+1})
=t^5-\sqrt{t^{10}+1}.
\]

令 \(t\to0\)，斜率：

\[
-1.
\]

过 \((0,-3)\)，斜率 \(-1\)：

\[
y=-x-3.
\]

Maple：

```text
-x-3
```

---

## 29. determinant with column operations

矩阵 \(A\) 做：

\[
C_3\leftarrow \frac1{k-4}C_3
\]

得到 \(B\)。

如果某一列乘以 \(c\)，行列式也乘以 \(c\)。

所以

\[
|B|=\frac1{k-4}|A|.
\]

因此

\[
|A|=(k-4)|B|.
\]

答案：

```text
alpha = k-4
```

接着 \(B\to C\) 是

\[
C_2\leftarrow C_2-kC_3.
\]

一列加另一列倍数，行列式不变。

所以

```text
beta = 1
```

对 \(C\)：

\[
C=
\begin{pmatrix}
k&0&1\\
1&k+9&1\\
-8&0&1
\end{pmatrix}.
\]

沿第二列展开：

\[
\det C=(k+9)\det\begin{pmatrix}k&1\\-8&1\end{pmatrix}
=(k+9)(k+8).
\]

\[
\det A=(k-4)(k+9)(k+8).
\]

所以 \(Ax=0\) 有非零解当

\[
k=4,-9,-8.
\]

注意 \(k=4\) 是 Maple 除以 \(k-4\) 的特殊值，仍要代回原矩阵检查；它确实使第三列为零，所以奇异。

答案：

```text
-9,-8,4
```

非零解：

最大 \(k=4\)，第三列是零列，所以

```text
<0,0,1>
```

最小 \(k=-9\)，一个非零解可取：

```text
<0,-13,9>
```

---

## 30. Fundamental Theorem with \(F(x)=\int_{2x}^{3x^2} f(t)dt\)

题目函数：

\[
F(x)=\int_{2x}^{3x^2}f(t)\,dt.
\]

即使 \(f\) 在整个实线不 bounded，对每个固定 \(x\)，积分区间 \([2x,3x^2]\) 是有限闭区间。分段连续函数在有限区间上可积，所以 \(F(x)\) well-defined。

### 30.1 能否让 \(F\) invertible

可以。比如选 \(f(t)=1\)，则

\[
F(x)=3x^2-2x
\]

这不是 invertible。但可以选合适的 \(f\) 让 \(F'\) 始终正或始终负。题目若允许自由选择，一般答案是 Yes。

### 30.2 让 \(f\) 在 0 处 differentiable

右边：

\[
f(x)=a(x),\quad x\ge0.
\]

左边：

\[
f(x)=b(x)=b_2x^2+b_1x+b_0,\quad x<0.
\]

要 differentiable at 0，至少要函数值和一阶导数匹配：

\[
b_0=a(0)=a0,
\]

\[
b_1=a'(0)=a1.
\]

\(b_2\) 不影响一阶可导；如果题目给了 \(a''(0)\)，通常是希望二阶也匹配：

\[
2b_2=a''(0)=a2.
\]

所以

```text
b0 = a0
b1 = a1
b2 = a2/2
```

### 30.3 求 \(F'(x)\)

变上下限公式：

\[
F'(x)=f(3x^2)\cdot6x-f(2x)\cdot2.
\]

当 \(x>0\)，两个上/下限都是 \(\ge0\)，所以用 \(a\)：

\[
F'(x)=6x a(3x^2)-2a(2x).
\]

当 \(x<0\)，\(3x^2>0\) 用 \(a\)，而 \(2x<0\) 用 \(b\)：

\[
F'(x)=6x a(3x^2)-2b(2x).
\]

可以写成 piecewise。

### 30.4 derivative 是否在 0 连续

题目说 \(F'(0)=0\)。从公式看两边 \(x\to0\) 时都趋向

\[
-2a(0)
\]

或

\[
-2b(0),
\]

除非 \(a(0)=0\)，否则不趋向 \(0\)。

所以一般不连续。

答案：

```text
No
```

---

## 31. 最后复习总口诀

1. Skew-symmetric：想到 \(A^T=-A\)、对角线 0、\(x^TAx=0\)。
2. Orthogonal：目标永远是证明 \(B^TB=I\)。
3. 复数线性方程：写 \(z=x+iy\)，拆成 \(Ax=p\)、\(Ay=q\)。
4. 多项式没实根：看每项是不是非负且有正数。
5. 连续定义：把 \(|f(x)-f(0)|\) 压到 \(<1/k\)。
6. Odd 函数在 \([-R,R]\) 上积分为 0。
7. Riemann integrable：有界 + 有限个不连续点，一定可积；无限跳点要看能否把尾巴面积压小。
8. \(A^TA=0\)：列长度平方全为 0，所以 \(A=0\)。
9. 导数界：用 Mean Value Theorem。
10. 反函数：严格递增保证 invertible。
11. \(\int G\) 收敛，不代表 \(\int uG\)、\(\int\sqrt G\)、\(\int G^2\) 收敛。
12. 比值趋于 1，不代表差趋于 0。
13. 三对角 determinant：\(D_n=D_{n-1}-pqD_{n-2}\)。
14. 含 \(\bar z\)：设 \(z=x+iy\)。
15. 实系数多项式：非实根要带共轭。
16. 共线：方向向量成倍数。
17. 投影：投影方向缩放不变，被投影向量缩放会跟着缩放。
18. 极坐标：\(x=r\cos\theta,y=r\sin\theta\)；切线斜率用参数导数。
19. Odd/even 分解：\((F(x)+F(-x))/2\)、\((F(x)-F(-x))/2\)。
20. Rolle：两个端点函数值相等，就有中间导数为 0。

