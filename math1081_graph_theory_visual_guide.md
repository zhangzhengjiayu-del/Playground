# MATH1081 图论题型画图版指南

这份文件专门用“画图 + 直觉 + 步骤”讲图论题。目标是：你哪怕刚开始学，也能看到题目后知道应该画什么、数什么、怎么判断。

适用题型包括：

- vertex degree sequence
- tree
- Euler trail / Euler tour
- Hamilton path / Hamilton cycle
- bipartite graph
- planar graph
- Hasse diagram
- adjacency matrix
- graph isomorphism
- Dijkstra shortest path
- Kruskal minimal spanning tree
- grid graph
- base-m string graph
- regular graph / Dirac graph
- Platonic / Archimedean solids

---

# 0. 图论最小词典

## Graph 是什么

图由两部分组成：

```text
vertices 顶点：点
edges 边：连接两个点的线
```

例子：

```text
A ----- B
|       |
|       |
D ----- C
```

顶点：

```text
{A,B,C,D}
```

边：

```text
AB, BC, CD, DA
```

这就是一个 4-cycle，记作 `C4`。

---

## Degree 是什么

一个顶点的 degree 是连到它的边数。

```text
    B
    |
A---C---D
    |
    E
```

这里：

```text
deg(C)=4
deg(A)=deg(B)=deg(D)=deg(E)=1
```

最重要公式：

```text
所有顶点度数之和 = 2*边数
```

因为每条边有两个端点。

---

# 1. Vertex Degree Sequence 画图理解

## 题型

给一个 degree sequence，例如：

```text
4,3,2,2,1,1
```

问：

- 有没有 multigraph？
- 有没有 simple graph？
- 是不是 tree？
- 能不能补出 a,b？

---

## 第一步：握手定理

先加总和。

```text
4+3+2+2+1+1=13
```

如果是奇数：

```text
不可能是任何 graph 的 degree sequence
```

因为度数和必须等于 `2E`，一定是偶数。

画图直觉：

```text
每画一条边，就给两个顶点各 +1 degree

u ----- v

degree sum 增加 2
```

所以总和不可能是奇数。

---

## Simple graph 的额外限制

如果有 n 个顶点，simple graph 中：

```text
每个顶点最多连向其他 n-1 个顶点
```

所以：

```text
degree ≤ n-1
```

例子：

```text
7,6,6,5,4,2,2
```

这里 n=7，但出现 degree 7。

```text
simple graph 不可能
```

因为一个点不可能连 7 个其他点，只有 6 个其他点。

但 multigraph 可能，因为 multigraph 允许平行边：

```text
A ===== B
```

这两点之间可以有多条边。

---

## Havel-Hakimi 用图理解

判断 simple graph 是否存在，可以用 Havel-Hakimi。

例如：

```text
4,3,2,2,1,0
```

最大 degree 是 4。意思是最高点要连向其他 4 个点：

```text
      v2
      |
v3 -- v1 -- v4
      |
      v5

v1 degree = 4
```

所以把 4 删除，并让接下来 4 个最大 degree 各减 1：

```text
4,3,2,2,1,0
删除 4
3,2,2,1,0
前 4 个减 1
2,1,1,0,0
```

继续直到全 0 就成功；出现负数就失败。

---

# 2. Tree 树

## Tree 长什么样

tree 是没有 cycle 的 connected graph。

```text
    B
    |
A---C---D
    |
    E
```

这是 tree。

下面不是 tree，因为有 cycle：

```text
A ----- B
|       |
|       |
D ----- C
```

---

## Tree 的秒杀公式

如果图 connected，有 V 个顶点、E 条边：

```text
tree iff E = V - 1
```

所以 degree sequence 题：

1. 数顶点数 V；
2. 算 degree sum；
3. `E=degree sum/2`；
4. 看是不是 `E=V-1`。

例：

```text
degree sequence: 1,1,1,1,1,1,2,3,5
V=9
degree sum=16
E=8
V-1=8
```

如果题目说 connected，那么它是 tree。

---

# 3. Euler Trail / Euler Tour

## Euler 在问什么

Euler trail：

```text
走过每条边恰好一次，可以不回到起点
```

Euler tour：

```text
走过每条边恰好一次，并回到起点
```

---

## 画图直觉：为什么看奇度顶点

当你经过一个中间顶点时：

```text
进来一次，出去一次
```

边成对使用。

所以中间顶点 degree 必须是偶数。

只有起点和终点可以是奇数。

---

## 判断规则

对 connected graph：

```text
0 个奇度顶点：有 Euler tour，也有 Euler trail
2 个奇度顶点：有 Euler trail，但没有 Euler tour
其他数量：没有 Euler trail
```

---

## 例子 1：Euler tour

```text
A ----- B
|       |
|       |
D ----- C
```

每个点 degree 2，都是偶数。

所以有 Euler tour：

```text
A-B-C-D-A
```

---

## 例子 2：Euler trail 但不是 tour

```text
A ----- B ----- C
```

degree：

```text
deg(A)=1
deg(B)=2
deg(C)=1
```

有 2 个奇度顶点，所以有 Euler trail：

```text
A-B-C
```

但不能回到起点，所以没有 Euler tour。

---

## Complete graph K52 删除最少边变 Euler tour

`K52` 每个顶点连向其他 51 个点：

```text
degree = 51
```

52 个顶点全部是奇度。

删除一条边会让两个端点 degree 各减 1：

```text
odd --edge-- odd

删除后：
even       even
```

所以一条边最多修复 2 个奇度顶点。

要修复 52 个奇度顶点：

```text
52/2 = 26
```

答案是 26。

画成 matching：

```text
1--2   3--4   5--6   ...   51--52
```

删掉这 26 条边。

---

# 4. Hamilton Path / Hamilton Cycle

## Hamilton 在问什么

Hamilton path：

```text
经过每个顶点恰好一次
```

Hamilton cycle：

```text
经过每个顶点恰好一次，并回到起点
```

注意：

```text
Euler 看边
Hamilton 看点
```

---

## 对比图

这个有 Euler tour：

```text
A ----- B
|       |
|       |
D ----- C
```

也有 Hamilton cycle：

```text
A-B-C-D-A
```

但有些图 Euler 和 Hamilton 不一样。

星形图：

```text
    B
    |
C---A---D
    |
    E
```

它没有 Hamilton path 覆盖所有点一次后继续走，因为中心 A 会被迫重复使用。

---

## K_n 删除一条边的 Hamilton cycle

`K3` 删除一条边：

```text
A ----- B

C
```

更准确是 path：

```text
A ----- C ----- B
```

没有 Hamilton cycle。

`K4` 删除一条边：

```text
A ----- B
|\     /|
| \   / |
|  \ /  |
D ----- C

假设缺 AB
```

仍有 Hamilton cycle：

```text
A-C-B-D-A
```

所以：

```text
K_n 删除一边后，n≥4 有 Hamilton cycle
n=3 没有
```

---

# 5. Bipartite Graph 二分图

## 二分图是什么

可以把顶点分成左右两组，使每条边都跨组。

```text
Left        Right

A -------- 1
B -------- 2
C -------- 3
```

同一组内部不能有边。

---

## 最重要判断

```text
graph is bipartite iff no odd cycle
```

没有奇数长度 cycle，就是 bipartite。

---

## 偶环是 bipartite

```text
A ----- B
|       |
|       |
D ----- C
```

染色：

```text
A,C 颜色红
B,D 颜色蓝
```

每条边都连接红蓝。

---

## 三角形不是 bipartite

```text
   A
  / \
 /   \
B-----C
```

如果 A 红，则 B、C 都必须蓝。
但 B 和 C 有边，不能同色。

所以失败。

---

## Grid graph 永远 bipartite

网格点 `(a,b)` 按 `a+b` 奇偶染色：

```text
(a+b) even: red
(a+b) odd : blue
```

相邻点只改一个坐标，所以奇偶一定反转。

示意：

```text
R - B - R - B
|   |   |   |
B - R - B - R
|   |   |   |
R - B - R - B
```

---

# 6. Planar Graph 平面图

## 平面图是什么

可以画在平面上，边不交叉。

平面：

```text
A ----- B
|       |
|       |
D ----- C
```

非平面的经典例子：

```text
K5
K3,3
```

---

## Euler 公式

对 connected planar graph：

```text
V - E + F = 2
```

其中：

```text
V = vertices
E = edges
F = faces/regions，包括外部区域
```

---

## 画图数 region

```text
A ----- B
|       |
|       |
D ----- C
```

这里：

```text
V=4
E=4
```

所以：

```text
4-4+F=2
F=2
```

两个区域：

```text
里面一个 square face
外面一个 infinite face
```

---

## 平面图边数上限

simple connected planar graph 且 `V≥3`：

```text
E≤3V-6
```

如果没有 triangle，也就是每个 face 至少 4 条边：

```text
E≤2V-4
```

如果每个 face 至少 6 条边：

```text
E≤3(V-2)/2
```

---

## Dual graph 有 Euler tour 的题

题意：

```text
dual graph 的顶点 = 原图的 faces
dual graph 的 degree = 原图对应 face 的边数
```

如果 dual 有 Euler tour：

```text
dual 每个顶点 degree 偶数
```

所以：

```text
原图每个 face 的边数都是偶数
```

如果原图又没有 4-cycle，则 face 不能是 4 边形。

face 长度至少：

```text
6
```

于是：

```text
2E = 所有 face 长度总和 ≥ 6F
```

这就是证明 `E≤24` 那类题的核心图像。

---

# 7. Hasse Diagram 偏序图

## Hasse 图是什么

Hasse diagram 是 partial order 的简化图。

它只画“直接覆盖关系”，不画：

- 自己到自己；
- 能通过中间点推出的边。

---

## 整除偏序例子

集合：

```text
S={1,2,4}
```

整除关系：

```text
1|2
2|4
1|4
```

但 Hasse 图只画：

```text
4
|
2
|
1
```

不画 `1--4`，因为中间有 2。

---

## 覆盖关系

在整除偏序中，a 和 b 有 Hasse 边 iff：

```text
a|b
且不存在 c 使 a|c|b 且 c 不是 a,b
```

例：

```text
1|4
```

但：

```text
1|2|4
```

所以 1 和 4 没有 Hasse 边。

---

## minimal / maximal 画图

```text
      12
     /  \
    4    6
    |    |
    2    3
     \  /
      1
```

minimal element：

```text
没有东西在它下面
```

这里是 1。

maximal element：

```text
没有东西在它上面
```

这里是 12。

如果图顶上有多个点，就有多个 maximal elements。

---

## upper bound / lower bound

对两个点 4 和 6：

```text
      12
     /  \
    4    6
    |    |
    2    3
     \  /
      1
```

upper bound：

```text
同时在 4 和 6 上方
```

这里是 12。

lower bound：

```text
同时在 4 和 6 下方
```

这里是 1。

least upper bound：

```text
共同上界里最低的那个
```

greatest lower bound：

```text
共同下界里最高的那个
```

---

# 8. Adjacency Matrix 邻接矩阵

## 矩阵怎么读图

如果顶点顺序是：

```text
A,B,C,D
```

矩阵：

```text
    A B C D
A [ 0 1 0 1 ]
B [ 1 0 1 0 ]
C [ 0 1 0 1 ]
D [ 1 0 1 0 ]
```

表示边：

```text
AB, AD, BC, CD
```

也就是：

```text
A ----- B
|       |
|       |
D ----- C
```

---

## loop 看哪里

对角线：

```text
M_AA, M_BB, M_CC, ...
```

如果对角线非 0：

```text
这个点有 loop
```

示意：

```text
A
↻
```

---

## parallel edges 看哪里

非对角线如果大于 1：

```text
M_AB=2
```

表示 A 和 B 之间有两条平行边：

```text
A ===== B
```

---

## 矩阵幂数 walks

最重要：

```text
(M^k)_{ij} = 从 i 到 j 的长度 k 的 walks 数量
```

所以：

```text
(M^3)_{DD}
```

就是从 D 回到 D 的 length 3 walks 数量。

---

# 9. Graph Isomorphism 图同构

## 同构是什么

两个图只是顶点名字不同，结构一样。

```text
Graph G:
a ----- b
|       |
d ----- c

Graph H:
w ----- x
|       |
z ----- y
```

一个同构映射可以是：

```text
a→w
b→x
c→y
d→z
```

因为边关系完全保留。

---

## 做题步骤

1. 数每个顶点 degree。
2. degree 特殊的先匹配。
3. 看邻居的 degree。
4. 写映射。
5. 检查每条边。

---

## 邻居结构例子

```text
    b
    |
a---c---d
    |
    e
```

degree：

```text
deg(c)=4
其他都是 1
```

任何同构中：

```text
c 必须映到另一个图中 degree 4 的点
```

因为同构必须保留 degree。

---

# 10. Kruskal Minimal Spanning Tree

## MST 是什么

Minimal spanning tree：

```text
连接所有顶点
没有 cycle
总权重最小
```

---

## Kruskal 算法画图

给边：

```text
AB:1
BC:2
AC:3
CD:4
BD:5
```

图：

```text
    3
A ----- C
|     / |
1   2   4
| /     |
B ----- D
    5
```

Kruskal：

1. 选最小 AB=1。
2. 选 BC=2。
3. AC=3 会形成 cycle A-B-C-A，跳过。
4. 选 CD=4。

MST：

```text
A--B--C--D
```

总权重：

```text
1+2+4=7
```

---

## 为什么跳过 cycle

如果加一条边形成 cycle：

```text
A ----- B
|       |
D ----- C
```

cycle 中总能删掉一条边仍保持连通。

MST 不需要 cycle。

---

# 11. Dijkstra Shortest Path

## Dijkstra 在问什么

从起点到所有其他点的最短距离。

---

## 小例子

```text
      2
A -------- B
|          |
5          1
|          |
C -------- D
      2
```

从 A 出发。

初始：

```text
dist(A)=0
dist(B)=∞
dist(C)=∞
dist(D)=∞
```

更新 A 的邻居：

```text
B=2
C=5
```

选当前最小 B=2。

从 B 更新 D：

```text
D=2+1=3
```

当前：

```text
C=5
D=3
```

选 D=3。

从 D 更新 C：

```text
C=min(5,3+2)=5
```

最后：

```text
A=0
B=2
D=3
C=5
```

---

## Dijkstra 和 Kruskal 不同

Kruskal：

```text
选全图最小边，目标是总树权最小
```

Dijkstra：

```text
从一个起点出发，目标是到每个点的距离最短
```

同一个图里，MST 不一定是 shortest path tree。

---

# 12. Weighted Edge Change Problems

## 题型

某条边权重可以改，问最大是多少才能在 shortest path 中。

图形：

```text
a --x-- d ---- g
 \           /
  \_________/
```

如果经过 `a-d` 的路径长度是：

```text
x + dist(d,g)
```

其他不经过它的最短路是：

```text
L
```

要让它出现在某条 shortest path：

```text
x + dist(d,g) ≤ L
```

最大：

```text
x = L - dist(d,g)
```

---

# 13. Complete Graphs

## K_n 是什么

每两个顶点之间都有边。

`K4`：

```text
    A
   /|\
  / | \
 B--+--C
  \ | /
   \|/
    D
```

边数：

```text
C(n,2)=n(n-1)/2
```

每个点 degree：

```text
n-1
```

---

## K_n 删除一条边

删除边 AB：

```text
deg(A)=n-2
deg(B)=n-2
其他点 degree=n-1
```

用这个判断 Euler trail。

---

# 14. Complete Bipartite Graphs

## K_m,n 是什么

左边 m 个点，右边 n 个点，左右之间全连接，同边内部没边。

`K3,3`：

```text
L1 ----- R1
 | \   / |
 |  \ /  |
 |  / \  |
 | /   \ |
L2 ----- R2
 | \   / |
 |  \ /  |
 |  / \  |
 | /   \ |
L3 ----- R3
```

边数：

```text
mn
```

`K3,3` 是非平面经典图。

---

# 15. Grid Graph

## G(r,s)

顶点是格点：

```text
(a,b), 1≤a≤r, 1≤b≤s
```

相邻代表上下左右差 1。

`G(3,4)`：

```text
o---o---o---o
|   |   |   |
o---o---o---o
|   |   |   |
o---o---o---o
```

顶点数：

```text
rs
```

边数：

```text
horizontal: r(s-1)
vertical: (r-1)s
total: r(s-1)+(r-1)s
```

---

## Grid 的 Euler

degree：

```text
corner: 2
edge non-corner: 3
inside: 4
```

奇度点是边界非角点：

```text
2(r-2)+2(s-2)
```

Euler trail/tour 就看这个数是 0、2、还是更多。

---

## Grid 的 Hamilton cycle

grid graph 是 bipartite。

Hamilton cycle 长度是顶点数 `rs`。

cycle 在 bipartite graph 中长度必须是偶数。

所以如果 `rs` 是奇数：

```text
没有 Hamilton cycle
```

对 rectangular grid `r,s≥2`：

```text
Hamilton cycle iff r or s is even
```

---

# 16. Base-m String Graph

## G(m,n) 长什么样

顶点是长度 n 的 base-m 字符串。

例：

```text
G(2,2) vertices:
00,01,10,11
```

两个字符串只差一位就连边：

```text
00 ----- 01
|        |
|        |
10 ----- 11
```

这就是一个 square，也就是 `Q2`。

---

## 顶点数和边数

每个字符串 n 位，每位 m 种：

```text
V=m^n
```

每个顶点可以：

```text
选 1 个位置改：n 种
改成其他 digit：m-1 种
```

所以 degree：

```text
n(m-1)
```

边数：

```text
E = m^n*n(m-1)/2
```

---

## Euler tour

图连通。

Euler tour iff every degree even：

```text
n(m-1) even
```

---

# 17. Regular Graph

## k-regular 是什么

每个顶点 degree 都是 k。

```text
C5:
    o
  /   \
 o     o
 |     |
 o --- o
```

每个点 degree 2，所以是 2-regular。

---

## 2-regular 图

每个 connected component 都是 cycle。

9 个点的 2-regular graph 可能是：

```text
C9
C6 + C3
C5 + C4
C3 + C3 + C3
```

所以 up to isomorphism 有 4 种。

---

## k-regular 存在检查

n 个顶点 k-regular：

```text
degree sum = nk
```

必须是偶数。

还要：

```text
k≤n-1
```

---

# 18. Dirac Graph

## Dirac 条件

每个顶点 degree 至少：

```text
n/2
```

这类图非常密。

---

## 为什么大 n 的 Dirac graph 非平面

平面图边数最多：

```text
E≤3n-6
```

Dirac 条件给：

```text
degree sum ≥ n*(n/2)
```

所以：

```text
E≥n^2/4
```

如果：

```text
n^2/4 > 3n-6
```

那就不可能平面。

---

# 19. Platonic Solids and Planar Graphs

## 立体图转平面图

把一个 face 戳破，从里面看，可以投影成 planar graph。

Euler 公式仍然：

```text
V-E+F=2
```

---

## n 和 m

```text
n = 每个 face 有几条边
m = 每个 vertex 有几个 face 相遇
```

五个 Platonic solids：

```text
Tetrahedron:  n=3, m=3
Cube:         n=4, m=3
Octahedron:   n=3, m=4
Dodecahedron: n=5, m=3
Icosahedron:  n=3, m=5
```

---

## incidence counting

每条边属于两个面：

```text
nF=2E
```

每条边有两个端点，每个点有 m 条边：

```text
mV=2E
```

代入 Euler：

```text
F+V=E+2
```

可推出：

```text
1/E = 1/n + 1/m - 1/2
```

---

# 20. Archimedean Solids

## 面数算边数

如果 faces 是：

```text
12 squares, 8 hexagons, 6 octagons
```

face-edge incidence 总数：

```text
12*4 + 8*6 + 6*8
```

每条边被两个 face 共用，所以：

```text
E = (12*4 + 8*6 + 6*8)/2
```

---

## vertex configuration 算顶点数

如果 vertex configuration 是：

```text
4.6.8
```

说明每个顶点被 3 个 faces 碰到。

所以：

```text
V = (12*4 + 8*6 + 6*8)/3
```

---

# 21. GCD Graphs

## 图的定义

顶点是整数：

```text
a,a+1,...,b
```

两个点 i,j 相连 iff：

```text
gcd(i,j)≠1
```

也就是它们有共同质因子。

---

## 怎么画

例：

```text
{2,3,4,5,6}
```

分解：

```text
2=2
3=3
4=2^2
5=5
6=2*3
```

边：

```text
2--4，因为 gcd=2
2--6，因为 gcd=2
3--6，因为 gcd=3
4--6，因为 gcd=2
```

5 和所有这些都不连。

画图：

```text
2 ----- 4
 \     /
  \   /
    6
    |
    3

5 isolated
```

---

## 找 triangle

如果三个数两两有共同因子，就有 triangle。

经典：

```text
6,10,15
```

因为：

```text
gcd(6,10)=2
gcd(6,15)=3
gcd(10,15)=5
```

所以：

```text
6--10--15--6
```

有 triangle，因此不是 bipartite。

---

# 22. Walk-defined Relations

## walk 是什么

walk 可以重复点和边。

```text
A-B-A-B-C
```

这是从 A 到 C 的 length 4 walk。

---

## relation: 有长度 k 的 walk

定义：

```text
v R_k w iff exists a walk of length k from v to w
```

在无向图中：

如果 v 到 w 有 walk，反过来走也有。

所以：

```text
R_k symmetric
```

---

## reflexive iff k even

从 v 出发走到邻居再回来：

```text
v-u-v
```

长度 2。

重复这个动作可以得到任何偶数长度回到自己。

所以偶数 k 时 reflexive。

奇数 k 在 bipartite graph 中不能回到自己。

---

# 23. 图论考试快速流程

看到 degree sequence：

```text
先加总和，看奇偶；再看 max degree；必要时 Havel-Hakimi。
```

看到 tree：

```text
connected + E=V-1。
```

看到 Euler：

```text
数奇度顶点。
```

看到 Hamilton：

```text
找是否能经过所有点一次；二分图先看两边数量。
```

看到 planar：

```text
用 V-E+F=2 或 E≤3V-6；找 K5/K3,3。
```

看到 Hasse：

```text
只画覆盖关系，不画传递边。
```

看到 adjacency matrix：

```text
对角线看 loop，非对角线 >1 看 parallel，M^k 看 walks。
```

看到 MST：

```text
Kruskal：小边优先，不成环。
```

看到 shortest path：

```text
Dijkstra：当前最短顶点优先。
```

看到 isomorphism：

```text
先按 degree 分组，再看邻居结构。
```

