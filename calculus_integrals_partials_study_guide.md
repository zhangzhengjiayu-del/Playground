# Calculus: Integrals, Recurrences, Partial Derivatives Study Guide

这份总结对应你发的 calculus 题。每一类都包含：题型识别、核心知识点、做题步骤、这批题的答案和 Maple 输入格式。

## 1. 三角 / 双曲三角代换

题目：

```text
int dx / (25 - x^2)^(3/2)
```

遇到：

```text
a^2 - x^2
```

常用代换：

```text
x = a*sin(theta)
```

因为：

```text
a^2 - a^2*sin(theta)^2 = a^2*cos(theta)^2
```

双曲三角代换可以用：

```text
x = a*tanh(u)
```

因为：

```text
1 - tanh(u)^2 = sech(u)^2
```

所以本题应该选：

```text
x = 5*sin(theta)
x = 5*tanh(u)
```

不要选：

- `x = 5*sec(theta)`：通常用于 `x^2 - a^2`。
- `x = 5*tan(theta)`：通常用于 `a^2 + x^2`。
- `x = 5*sinh(u)`：通常用于 `a^2 + x^2`。
- `x = 5*cosh(u)`：会让 `25 - x^2` 变成非正形式。

## 2. Product-to-sum 三角积分

题目：

```text
int cos(2*x)*cos(3*x) dx
```

公式：

```text
cos(A)*cos(B) = (1/2)*(cos(A-B) + cos(A+B))
```

所以：

```text
cos(2*x)*cos(3*x) = (1/2)*(cos(x) + cos(5*x))
```

积分：

```text
(1/2)*sin(x) + (1/10)*sin(5*x) + C
```

Maple 输入：

```text
1/2*sin(x) + 1/10*sin(5*x)
```

## 3. sin^m(x) cos^n(x) 的标准方法

### 核心规则

1. 如果 `sin` 的幂是奇数，留一个 `sin(x) dx`，把剩下的 `sin^2(x)` 改成 `1 - cos^2(x)`，令 `u = cos(x)`。
2. 如果 `cos` 的幂是奇数，留一个 `cos(x) dx`，把剩下的 `cos^2(x)` 改成 `1 - sin^2(x)`，令 `u = sin(x)`。
3. 如果两个幂都是偶数，通常用半角公式。

### 3.1 题目：`int sin(x)^7*cos(x)^2 dx`

因为 `sin` 的幂是奇数：

```text
sin(x)^7 = sin(x)*(sin(x)^2)^3
         = sin(x)*(1 - cos(x)^2)^3
```

令：

```text
u = cos(x), du = -sin(x) dx
```

结果：

```text
-1/3*cos(x)^3 + 3/5*cos(x)^5 - 3/7*cos(x)^7 + 1/9*cos(x)^9 + C
```

题目只问：

```text
a3, a4, a5, a6, a7
```

答案：

```text
a3 = -1/3
a4 = 0
a5 = 3/5
a6 = 0
a7 = -3/7
```

### 3.2 题目：`int sin(x)^8*cos(x)^5 dx`

因为 `cos` 的幂是奇数：

```text
cos(x)^5 = cos(x)*(cos(x)^2)^2
         = cos(x)*(1 - sin(x)^2)^2
```

令：

```text
u = sin(x), du = cos(x) dx
```

结果：

```text
1/9*sin(x)^9 - 2/11*sin(x)^11 + 1/13*sin(x)^13 + C
```

题目只问：

```text
a9, a10, a11, a12, a13
```

答案：

```text
a9 = 1/9
a10 = 0
a11 = -2/11
a12 = 0
a13 = 1/13
```

## 4. 用 recurrence relation 算定积分

递推题的核心是：把题目给的公式当作代数公式，不需要重新积分。

### 4.1 `int_0^1 x^2*exp(-8*x) dx`

给定：

```text
I_n = int_0^1 x^n*exp(-8*x) dx
I_n = -1/8*exp(-8) + (n/8)*I_(n-1)
```

先有：

```text
I_0 = int_0^1 exp(-8*x) dx = (1 - exp(-8))/8
```

推出：

```text
I_2 = 1/256 - 41/256*exp(-8)
```

Maple 输入：

```text
1/256 - 41/256*exp(-8)
```

### 4.2 `int_1^e (23 + ln(x))^2 dx`

给定：

```text
J_n = int_1^e (23 + ln(x))^n dx
J_n = 24^n*exp(1) - 23^n - n*J_(n-1)
```

因为：

```text
J_0 = e - 1
```

推出：

```text
J_2 = -485 + 530*exp(1)
```

Maple 输入：

```text
-485 + 530*exp(1)
```

### 4.3 已知 `int_0^1 x^8*exp(-x) dx`，求 `int_0^1 x^7*exp(-x) dx`

给定：

```text
I_n = -exp(-1) + n*I_(n-1)
I_8 = 40320 - 109601*exp(-1)
```

由：

```text
I_8 = -exp(-1) + 8*I_7
```

得到：

```text
I_7 = 5040 - 13700*exp(-1)
```

Maple 输入：

```text
5040 - 13700*exp(-1)
```

### 4.4 已知 `int_1^e (ln(x))^5 dx`，求 `int_1^e (ln(x))^4 dx`

给定：

```text
I_n = exp(1) - n*I_(n-1)
I_5 = 120 - 44*exp(1)
```

由：

```text
I_5 = exp(1) - 5*I_4
```

得到：

```text
I_4 = -24 + 9*exp(1)
```

Maple 输入：

```text
-24 + 9*exp(1)
```

### 4.5 已知 `int_0^1 (1 - x^2)^6 dx`，求 `int_0^1 (1 - x^2)^4 dx`

给定：

```text
I_n = (2*n)/(2*n + 1)*I_(n-1)
I_6 = 1024/3003
```

因为：

```text
I_6 = (12/13)*(10/11)*I_4
```

所以：

```text
I_4 = 128/315
```

Maple 输入：

```text
128/315
```

### 4.6 已知 `int_0^1 (1 - x^4)^6 dx`，求 `int_0^1 (1 - x^4)^4 dx`

给定：

```text
I_n = (4*n)/(4*n + 1)*I_(n-1)
I_6 = 65536/116025
```

因为：

```text
I_6 = (24/25)*(20/21)*I_4
```

所以：

```text
I_4 = 2048/3315
```

Maple 输入：

```text
2048/3315
```

### 4.7 已知 `int_0^1 (1 - x^4)^7 dx`，求 `int_0^1 (1 - x^4)^10 dx`

给定：

```text
I_7 = 262144/480675
```

正向递推：

```text
I_8  = (32/33)*I_7
I_9  = (36/37)*I_8
I_10 = (40/41)*I_9
```

结果：

```text
I_10 = 268435456/534734915
```

Maple 输入：

```text
268435456/534734915
```

### 4.8 已知 `int_0^1 (1 - x^2)^8 dx`，求 `int_0^1 (1 - x^2)^11 dx`

给定：

```text
I_8 = 32768/109395
```

正向递推：

```text
I_9  = (18/19)*I_8
I_10 = (20/21)*I_9
I_11 = (22/23)*I_10
```

结果：

```text
I_11 = 524288/2028117
```

Maple 输入：

```text
524288/2028117
```

### 4.9 已知 `int_1^e (ln(x))^4 dx`，求 `int_1^e (ln(x))^6 dx`

给定：

```text
I_n = exp(1) - n*I_(n-1)
I_4 = -24 + 9*exp(1)
```

先算：

```text
I_5 = exp(1) - 5*I_4 = 120 - 44*exp(1)
```

再算：

```text
I_6 = exp(1) - 6*I_5 = -720 + 265*exp(1)
```

Maple 输入：

```text
-720 + 265*exp(1)
```

### 4.10 已知 `int_0^1 x^5*exp(-x) dx`，求 `int_0^1 x^7*exp(-x) dx`

给定：

```text
I_5 = 120 - 326*exp(-1)
I_n = -exp(-1) + n*I_(n-1)
```

先算：

```text
I_6 = -exp(-1) + 6*I_5
    = 720 - 1957*exp(-1)
```

再算：

```text
I_7 = -exp(-1) + 7*I_6
    = 5040 - 13700*exp(-1)
```

Maple 输入：

```text
5040 - 13700*exp(-1)
```

## 5. Tangent plane 的 normal vector

题目：

```text
z = x^3 + 3*y^3
```

在点：

```text
(x,y,z) = (2,-4,-184)
```

把曲面写成隐函数：

```text
F(x,y,z) = x^3 + 3*y^3 - z = 0
```

切平面的法向量是梯度：

```text
grad F = <3*x^2, 9*y^2, -1>
```

代入 `(2,-4)`：

```text
<12,144,-1>
```

Maple 输入：

```text
<12,144,-1>
```

也可以输入任意非零倍数，例如：

```text
<-12,-144,1>
```

## 6. 二阶混合偏导

题目：

```text
F = y*x^3 + 4*x^2*y - x*y^2 + 2*x^7*y^7 + 4*sin(1/y) + 7*exp(x)
```

求：

```text
partial^2 F / partial x partial y
```

先对 `y` 求偏导，再对 `x` 求偏导：

```text
F_y = x^3 + 4*x^2 - 2*x*y + 14*x^7*y^6
```

再对 `x` 求导：

```text
F_xy = 3*x^2 + 8*x - 2*y + 98*x^6*y^6
```

Maple 输入：

```text
3*x^2 + 8*x - 2*y + 98*x^6*y^6
```

说明：`4*sin(1/y)` 对 `x` 没有贡献，`7*exp(x)` 对 `y` 没有贡献。

## 7. Chain rule for partial derivatives

题目：

```text
F(x,y) = f(6*x^4 - 3*y)
g(x) = f'(x)
```

设：

```text
u = 6*x^4 - 3*y
```

链式法则：

```text
F_x = f'(u)*u_x
F_y = f'(u)*u_y
```

因为 `f' = g`：

```text
F_x = 24*x^3*g(6*x^4 - 3*y)
F_y = -3*g(6*x^4 - 3*y)
```

Maple 输入：

```text
24*x^3*g(6*x^4 - 3*y)
```

```text
-3*g(6*x^4 - 3*y)
```

## 8. Total differential approximation 误差估计

公式：

```text
Delta z ≈ z_x*Delta x + z_y*Delta y
```

最大误差用绝对值上界：

```text
|Delta z| <= |z_x|*|Delta x| + |z_y|*|Delta y|
```

### 8.1 最大可能误差

已知：

```text
z_x = -2
z_y = 3
|Delta x| <= 0.01
|Delta y| <= 0.01
```

所以：

```text
|Delta z| <= 2*0.01 + 3*0.01 = 0.05
```

答案：

```text
0.05
```

### 8.2 已知 x, y 的变化量，估计 z 的变化

已知：

```text
z_x = 1
z_y = -3
x decreases by 0.02  => Delta x = -0.02
y decreases by 0.08  => Delta y = -0.08
```

所以：

```text
Delta z ≈ 1*(-0.02) + (-3)*(-0.08)
        = -0.02 + 0.24
        = 0.22
```

答案：

```text
0.22
```

## 9. Chain rule with parameter t

题目：

```text
z = -3*y^3 + 3*x^2
```

其中 `x` 和 `y` 都是 `t` 的函数。

链式法则：

```text
dz/dt = z_x*dx/dt + z_y*dy/dt
```

先求偏导：

```text
z_x = 6*x
z_y = -9*y^2
```

已知当 `t = 2`：

```text
x = -3
y = -3
dx/dt = -3
dy/dt = -1
```

代入：

```text
dz/dt = 6*(-3)*(-3) + (-9*(-3)^2)*(-1)
      = 54 + 81
      = 135
```

答案：

```text
135
```

## 10. 总结：这批题的答案速查

```text
Trig/hyperbolic substitution:
x = 5*sin(theta), x = 5*tanh(u)

int cos(2*x)*cos(3*x) dx:
1/2*sin(x) + 1/10*sin(5*x)

int sin(x)^7*cos(x)^2 dx:
a3 = -1/3
a4 = 0
a5 = 3/5
a6 = 0
a7 = -3/7

int sin(x)^8*cos(x)^5 dx:
a9 = 1/9
a10 = 0
a11 = -2/11
a12 = 0
a13 = 1/13

int_0^1 x^2*exp(-8*x) dx:
1/256 - 41/256*exp(-8)

int_1^e (23 + ln(x))^2 dx:
-485 + 530*exp(1)

int_0^1 x^7*exp(-x) dx:
5040 - 13700*exp(-1)

int_1^e (ln(x))^4 dx:
-24 + 9*exp(1)

int_0^1 (1 - x^2)^4 dx:
128/315

int_0^1 (1 - x^4)^4 dx:
2048/3315

int_0^1 (1 - x^4)^10 dx:
268435456/534734915

int_0^1 (1 - x^2)^11 dx:
524288/2028117

int_1^e (ln(x))^6 dx:
-720 + 265*exp(1)

normal vector:
<12,144,-1>

mixed partial:
3*x^2 + 8*x - 2*y + 98*x^6*y^6

F_x:
24*x^3*g(6*x^4 - 3*y)

F_y:
-3*g(6*x^4 - 3*y)

maximum error:
0.05

dz/dt at t=2:
135

Delta z:
0.22
```

