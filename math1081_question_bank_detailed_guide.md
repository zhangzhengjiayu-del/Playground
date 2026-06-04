# MATH1081 Question Bank 详细题型指南

这份文件按你给的 question bank title 来整理。它不是只给公式，而是尽量用“第一次学也能看懂”的方式说明：

- 这题考什么；
- 题目在问什么；
- 零基础怎么理解；
- 做题步骤；
- 常见坑；
- 简单例题模板。

本文件会分批追加。本次是第一批：集合、函数、关系、偏序。

---

# 第一批：集合、函数、关系、偏序

## 1. Favourite Sets Comparison

**考点：** 集合列举、集合差、幂集、笛卡尔积、基数。

**这题在问什么：**

这类题会给两个集合，例如：

```text
A = {x^2+3 : x∈Z, -2≤x≤2}
B = {3,...,8}
```

然后问：

```text
|B-A|
|P(B-A)|
|P(A)-P(B)|
|P(A×B)|
```

**零基础理解：**

- `|S|` 表示集合 S 里面有多少个元素。
- `B-A` 表示在 B 里面，但不在 A 里面的元素。
- `P(S)` 是 S 的幂集，也就是 S 的所有子集组成的集合。
- `A×B` 是笛卡尔积，元素是有序对 `(a,b)`。

**做题步骤：**

1. 先把 A 真的列出来。

   例如 `x=-2,-1,0,1,2`：

   ```text
   x^2+3 = 7,4,3,4,7
   ```

   所以：

   ```text
   A={3,4,7}
   ```

   注意集合不重复计数。

2. 把 B 列出来：

   ```text
   B={3,4,5,6,7,8}
   ```

3. 求集合差：

   ```text
   B-A={5,6,8}
   ```

4. 用公式：

   ```text
   |P(S)| = 2^|S|
   |A×B| = |A|*|B|
   |P(A×B)| = 2^(|A|*|B|)
   ```

5. 求 `P(A)-P(B)` 时要注意：

   - 如果 `A⊆B`，那么 A 的每个子集也都是 B 的子集；
   - 所以 `P(A)⊆P(B)`；
   - 因此 `P(A)-P(B)=∅`。

**常见坑：**

- `{3,4,7}` 不是 5 个元素，重复的 4 和 7 只算一次。
- `P(A)-P(B)` 不是 `P(A-B)`。
- `|P(A×B)|` 不是 `2^|A| * 2^|B|`，而是 `2^(|A|*|B|)`。

---

## 2. Integer Sets, Cardinalities, and Functions

**考点：** 区间型整数集合、集合族、并集、交集、幂集、函数数量、单射、满射。

**典型题形：**

```text
S_n = {k∈Z : 5n+1 ≤ k ≤ 2n^2+1}
A = {S_n : 9≤n≤21}
```

然后问：

```text
|A|
|B|, where B={x | x∈X for some X∈A}
|C|, where C={x | x∈X for some X⊆A}
|D|, where D={x | x∈X for all X∈A}
|E|, where E={x | x∈X for all X⊆A}
functions from S_9 to S_10
injective functions from S_9 to S_10
surjective functions from S_9 to S_10
```

**零基础理解：**

每个 `S_n` 是一个整数区间。比如：

```text
S_9 = {整数 k : 46≤k≤163}
```

因为：

```text
5*9+1=46
2*9^2+1=163
```

集合大小公式：

```text
如果 S={L,L+1,...,U}，那么 |S|=U-L+1
```

**做题步骤：**

1. `|A|`：

   `n=9,10,...,21`，一共有：

   ```text
   21-9+1=13
   ```

2. 并集 `B`：

   ```text
   B = S_9 ∪ S_10 ∪ ... ∪ S_21
   ```

   通常这些区间会连在一起或重叠。检查：

   - 最小左端点一般来自最小 n；
   - 最大右端点一般来自最大 n；
   - 如果中间无断裂，就直接是一个大区间。

3. 交集 `D`：

   ```text
   D = S_9 ∩ S_10 ∩ ... ∩ S_21
   ```

   交集的左端点取最大左端点，右端点取最小右端点：

   ```text
   左端 = max(5n+1)
   右端 = min(2n^2+1)
   ```

4. `C={x | x∈X for some X⊆A}`：

   这里最容易错。

   因为 `X⊆A`，所以 X 是由一些 `S_n` 组成的集合。

   若 `x∈X`，那么 x 是某个 `S_n`，不是整数。

   因此 C 通常就是 A：

   ```text
   C=A
   ```

   因为空的 X 不贡献元素，但取 `X=A` 时会得到所有 `S_n`。

5. `E={x | x∈X for all X⊆A}`：

   因为 `X=∅` 也是 A 的子集，没有任何 x 属于空集。

   所以：

   ```text
   E=∅
   ```

6. 函数数量：

   若 `|S_9|=a`，`|S_10|=b`，那么：

   ```text
   functions S_9→S_10: b^a
   injective functions S_9→S_10: P(b,a), 若 b≥a，否则 0
   surjective functions S_9→S_10:
     若 a<b，则 0
     若 a=b，则 a!
     一般用容斥
   ```

**常见坑：**

- `some X∈A` 和 `some X⊆A` 完全不同。
- 空集是任何集合的子集，所以 “for all X⊆A” 经常导致答案是空集。
- 函数从大集合到小集合不可能单射；从小集合到大集合不可能满射。

---

## 3. Sets Within Sets - Subsets, Elements, and Quantifiers Multi-Select

**考点：** 元素属于 `∈`、子集 `⊆`、集合里面套集合。

**典型题形：**

```text
A={{1,2,3,...,m^2} | m=16,17,...,48}
```

选择哪些 statement 正确，例如：

```text
{1,2,...,289} is an element of A
289 is an element of A
{1,2,...,253} is a subset of A
1496 is an element of S for some S∈A
```

**零基础理解：**

A 的元素不是数字，而是一整个集合。

例如当 `m=17`：

```text
{1,2,...,17^2}={1,2,...,289}
```

所以：

```text
{1,2,...,289} ∈ A
```

但：

```text
289 ∉ A
```

因为 A 里面装的是集合，不是单个数字。

**做题步骤：**

1. 先问自己：A 的元素是什么类型？

   这里 A 的元素是：

   ```text
   {1,2,...,m^2}
   ```

   是集合。

2. 判断 `∈A` 时，左边必须也是这种完整集合。

3. 判断 `⊆A` 时，左边的每个元素都必须是 A 的元素。

4. 判断 `1496∈S for some S∈A`：

   这问的是有没有某个集合 `{1,...,m^2}` 包含 1496。

   也就是有没有 m 满足：

   ```text
   m^2 ≥ 1496
   ```

   且 `16≤m≤48`。

**常见坑：**

- `289∈{1,...,289}` 是真；
- 但 `289∈A` 通常是假，因为 A 里面不是数字。
- `{1,...,289}∈A` 和 `{1,...,289}⊆A` 是完全不同的话。

---

## 4. University Subjects and Cardinalities

**考点：** 三集合容斥原理。

**典型题形：**

给：

```text
|A|, |B|, |C|
|A∪B|, |B∪C|, |C∪A|
|A∩B∩C|
```

求：

```text
|A∪B∪C|
```

**零基础理解：**

三集合容斥公式：

```text
|A∪B∪C|
= |A|+|B|+|C|
  - |A∩B|-|A∩C|-|B∩C|
  + |A∩B∩C|
```

但题目常给的是 `|A∪B|`，不是 `|A∩B|`。

用二集合公式反推：

```text
|A∪B| = |A|+|B|-|A∩B|
```

所以：

```text
|A∩B| = |A|+|B|-|A∪B|
```

**做题步骤：**

1. 先算三个 pairwise intersections：

   ```text
   |A∩B| = |A|+|B|-|A∪B|
   |B∩C| = |B|+|C|-|B∪C|
   |C∩A| = |C|+|A|-|C∪A|
   ```

2. 再代入三集合公式。

**常见坑：**

- 不要把 `|A∪B|` 当成 `|A∩B|`。
- 三集合交集最后要加回来一次。

---

## 5. Examining Sets of Integers Defined by Inequalities

**考点：** 集合包含证明、线性不等式、反例点。

**典型题形：**

给：

```text
A={(x,y): 8x-3y≥2}
B={(x,y): 3x+4y≥9}
C={(x,y): 11x+y≥11}
```

证明：

```text
(x,y)∈A and (x,y)∈B ⇒ (x,y)∈C
```

也就是：

```text
A∩B⊆C
```

**零基础理解：**

如果一个点在 A 里，就满足 A 的不等式。
如果一个点在 B 里，就满足 B 的不等式。
我们要用这两个不等式推出 C 的不等式。

**做题步骤：**

1. 写出已知：

   ```text
   8x-3y≥2
   3x+4y≥9
   ```

2. 想办法把它们相加得到：

   ```text
   11x+y≥11
   ```

3. 直接相加：

   ```text
   (8x-3y)+(3x+4y) ≥ 2+9
   11x+y ≥ 11
   ```

4. 所以 `(x,y)∈C`。

5. 找 `C` 里但不在 A 的点：

   需要：

   ```text
   11x+y≥11
   8x-3y<2
   ```

   选简单点，比如试整数坐标。

**常见坑：**

- 证明 `A∩B⊆C` 不代表 `A⊆C`。
- 找到一个点在 C 不在 A，只能证明 `C⊄A` 或 `A≠C`，不能证明 `A∩B=C`。

---

## 6. Counting Functions Between Sets with Given Cardinalities

**考点：** 函数数量、函数集合、复合函数、preimage、injective 函数。

**典型题形：**

```text
|A|=24, |B|=45
C={functions from A to B}
D={functions from B to C}
```

问：

```text
|C|
|D|
g(f(a)) 是什么类型？
```

**零基础理解：**

如果从 A 到 B 的函数，就是 A 里面每个元素都要选一个 B 里的输出。

所以：

```text
|C| = |B|^|A| = 45^24
```

D 是从 B 到 C 的函数。C 本身是一个“函数集合”，所以：

```text
|D| = |C|^|B| = (45^24)^45
```

**类型检查：**

如果：

```text
a∈A
f∈C
g∈D
```

那么：

```text
f:A→B
g:B→C
```

所以：

```text
f(a)∈B
g(f(a))∈C
```

而 C 的元素是“从 A 到 B 的函数”。

所以 `g(f(a))` 是：

```text
an element of C
a function from A to B
```

**常见坑：**

- `g(f(a))` 不是 B 的元素，而是 C 的元素。
- 因为 g 的输出集合是 C。
- C 不是一个普通数字集合，它是函数集合。

---

## 7. Counting Functions Mapping Pirates to Islands

**考点：** 普通函数、单射、满射、容斥。

**题目故事：**

海盗船集合 P，岛屿集合 I，分配方式是函数：

```text
A:P→I
```

意思是每条船去一个岛。

**零基础理解：**

- 普通函数：每条船随便选一个岛。
- 单射 injective：没有两条船去同一个岛。
- 满射 surjective：每个岛至少有一条船去。

**公式：**

如果 `|P|=p`，`|I|=i`：

普通函数：

```text
i^p
```

单射：

```text
P(i,p)=i*(i-1)*...*(i-p+1)
```

要求 `i≥p`，否则 0。

满射：

```text
i^p - C(i,1)(i-1)^p + C(i,2)(i-2)^p - ...
```

或者：

```text
i! * S(p,i)
```

其中 `S(p,i)` 是第二类 Stirling 数，但考试通常用容斥。

**常见坑：**

- “每个岛至少一条船”是满射。
- “没有两条船同岛”是单射。
- 当船比岛多时，单射不可能。
- 当船比岛少时，满射不可能。

---

## 8. Functions as Sets and Their Properties

**考点：** 函数是 ordered pairs 的集合、domain/codomain、单射、满射。

**典型题形：**

```text
A={86,87,88,89,90}
B={86,87,88,89}
g1={(86,88),(87,86),(88,86),(89,87),(90,89)}
```

给定 `g1:A→B` 是函数，问：

```text
g1⊆A×B?
g1⊆B×A?
one-to-one?
surjective?
```

**零基础理解：**

函数 `A→B` 是一个关系，必须满足：

1. 每个 A 的元素都出现一次作为输入；
2. 每个输出都在 B 里面。

所以函数本质上是：

```text
g⊆A×B
```

**判断单射：**

看输出有没有重复。

例如：

```text
87→86
88→86
```

两个不同输入输出同一个值，所以不是单射。

**判断满射：**

看 B 里面每个元素有没有被输出到。

**常见坑：**

- `g⊆A×B` 是由函数方向决定的。
- `A→B` 不代表 `g⊆B×A`。
- codomain 里没被用到的元素会导致不是满射。

---

## 9. Relations as Functions

**考点：** 关系、函数、幂集、函数值是集合、onto/one-to-one 判断。

**典型题形：**

给有限非空集合 `S,T` 和关系：

```text
A⊆S×T
```

定义：

```text
f:S→P(T)
f(x)={t∈T | (x,t)∈A}
```

**零基础理解：**

对于每个 `x∈S`，`f(x)` 收集所有和 x 有关系的 T 元素。

比如：

```text
A={(1,a),(1,b),(2,b)}
```

那么：

```text
f(1)={a,b}
f(2)={b}
```

**如果 A 也是函数，说明什么？**

如果 A 是函数 `S→T`，那么每个 x 只能对应一个 t。

所以每个 `f(x)` 都是单元素集合：

```text
f(x)={t}
```

因此 `f(S)` 的元素都是 singleton sets。

**如果 `{y}∉f(S)`，说明什么？**

如果 A 是函数，并且 `{y}` 没出现在 f 的值域中，说明没有任何 x 被 A 映到 y。

所以 A 不是 onto。

但这不一定影响 one-to-one。

**函数 + equivalence relation 的关系 B⊆S×S：**

如果 B 同时是函数和等价关系：

- 等价关系必须 reflexive，所以每个 x 有 `(x,x)`；
- 函数要求每个 x 只有一个输出；
- 因为 `(x,x)` 已经占了这个唯一输出，所以不能有 `(x,y)` for y≠x。

因此 B 只能是 identity relation：

```text
B={(x,x): x∈S}
```

**常见坑：**

- `f(x)` 是一个集合，不是一个单独元素。
- `{y}∉f(S)` 不是说 y 不在 T，而是 singleton set `{y}` 没作为一个函数值出现。

---

## 10. Functions Mapping to and from Equivalence Classes

**考点：** 等价类、quotient set、自然映射、复合函数、preimage、反函数。

**典型题形：**

给等价关系 `∼`，定义：

```text
E = set of equivalence classes
f:T→E, f(x)=[x]
g:E→N, g(X)=|X|
```

问：

```text
(g∘f)(1)
f^{-1}({[1],[27]})
```

**零基础理解：**

`f(x)=[x]` 的意思是把一个元素送到它所在的等价类。

`g(X)=|X|` 的意思是把一个等价类送到这个类的大小。

所以：

```text
(g∘f)(1)=g(f(1))=g([1])=|[1]|
```

**如果等价关系是 mod 4：**

```text
x∼y iff x≡y mod 4
```

则 `[1]` 是集合 T 中所有除以 4 余 1 的元素。

**preimage：**

```text
f^{-1}({[1],[27]})
```

意思是所有被 f 送到 `[1]` 或 `[27]` 的原元素。

所以答案是：

```text
[1] ∪ [27]
```

但要只取 T 里的元素。

**关于 h=f^{-1} 是否能作为函数：**

一般 `f:T→E` 不是单射，因为同一个等价类里多个元素都会送到同一个类。

只有当每个等价类都只有一个元素时，f 才是双射，才有反函数。

所以结论通常是：

```text
sometimes possible
```

当等价关系是 equality relation 时可以。

**常见坑：**

- `[1]` 是一个集合，不是数字 1。
- `f^{-1}` 在这里如果不是函数，可能只是 preimage notation。
- `f^{-1}({[1]})` 是原集合 T 的子集。

---

## 11. Equivalence Relation Defined by a Cubic Polynomial

**考点：** 用函数定义等价关系、等价类、单元素等价类。

**典型题形：**

```text
f(x)=x^3-x-17
x∼y iff f(x)=f(y)
```

**零基础理解：**

这个关系说：

两个实数等价，当且仅当它们在函数 f 下有同样的输出。

这类关系一定是等价关系，因为“有同样函数值”天然满足：

1. 自反：`f(x)=f(x)`；
2. 对称：如果 `f(x)=f(y)`，则 `f(y)=f(x)`；
3. 传递：如果 `f(x)=f(y)` 且 `f(y)=f(z)`，则 `f(x)=f(z)`。

**等价类 `[0]`：**

```text
[0]={y∈R : y∼0}
```

即：

```text
f(y)=f(0)
```

先算：

```text
f(0)=-17
```

所以：

```text
y^3-y-17=-17
y^3-y=0
y(y-1)(y+1)=0
```

因此：

```text
[0]={-1,0,1}
```

**什么时候等价类只有一个元素？**

等价类 `[x]` 是所有和 x 有同样函数值的点。

如果水平线 `y=f(x)` 只和图像交一次，那么等价类只有一个元素。

通常选择函数局部极大/极小之外的高度，或者选择图像严格单调区域里唯一对应的点。

对三次函数：

```text
f'(x)=3x^2-1
```

转折点在：

```text
x=±1/sqrt(3)
```

取非常大的 x，如 `x=2`，对应的函数值通常只出现一次。

**是否存在恰好 2 个元素的等价类？**

对有两个 turning points 的 cubic，水平线经过局部最大或局部最小时，通常会有一个切点和另一个交点，所以恰好 2 个不同实根。

所以通常存在。

**常见坑：**

- 等价类不是只看 x 附近，而是所有实数 y 使 `f(y)=f(x)`。
- 证明 equivalence relation 不需要画图。

---

## 12. Equivalence Relations on Warlpiri Kin

**考点：** 等价关系、函数迭代、等价类、图/循环。

**题目意思：**

每个 kin group 的孩子 group 由 mother group 决定。于是有一个函数：

```text
mother map: group of mother → group of child
```

比如表格：

```text
1→4
2→3
3→1
4→2
5→7
6→8
7→6
8→5
```

**零基础理解：**

如果每一代都是女性，那么 group 会一直按 mother map 走。

所以 `x∼1y` 意思是从 x 出发，反复用 mother map，有可能到 y。

这会形成循环。

**做题步骤：**

1. 把映射箭头写出来。
2. 从目标数字开始一路走：

   ```text
   4→2→3→1→4
   ```

   所以：

   ```text
   [4]={1,2,3,4}
   ```

3. 另一个循环：

   ```text
   8→5→7→6→8
   ```

   所以：

   ```text
   [8]={5,6,7,8}
   ```

**父系版本：**

如果按 father group 推 descendant，则要结合 recommended marriage。

题目给：

```text
1 marries 5
2 marries 6
3 marries 7
4 marries 8
```

孩子 group 由母亲决定，所以如果父亲 group 是 x，要先找到推荐母亲 group，再用 mother map 得到孩子 group。

然后同样找循环。

**常见坑：**

- 女系看 mother map。
- 男系不是直接用 father map，得先用推荐婚配找母亲 group。
- 等价类就是循环里的所有 group。

---

## 13. Divisibility with Maximal, Minimal, Greatest, and Least Elements

**考点：** 整除偏序、minimal/maximal、least/greatest、upper/lower bound。

**典型题形：**

```text
S={n∈N : 11≤n≤30 and n=2^i3^j}
```

或者给具体集合：

```text
{39,69,169,299,507,897,3887,11661}
```

偏序是整除：

```text
a⪯b iff a|b
```

**零基础理解：**

在整除偏序里：

- 小的不是数值小，而是“能整除别人”。
- `a≤b` 在偏序中表示 `a|b`。

**minimal element：**

集合中没有别的元素能整除它。

**maximal element：**

它不能整除集合中别的更大的元素。

**least element：**

它能整除集合中所有元素。

**greatest element：**

集合中所有元素都能整除它。

**做题步骤：**

1. 列出集合所有元素。
2. 对每个数检查有没有集合中的其他数整除它。
   - 没有则 minimal。
3. 对每个数检查它有没有整除集合中的其他数。
   - 没有则 maximal。
4. least 要能整除所有元素。
5. greatest 要被所有元素整除。

**upper bounds of a,b：**

集合中能同时被 a 和 b 整除的元素。

也就是：

```text
a|x and b|x
```

**lower bounds of a,b：**

集合中能同时整除 a 和 b 的元素。

```text
x|a and x|b
```

**常见坑：**

- minimal 不等于 least。
- maximal 不等于 greatest。
- 一个 poset 可以有多个 minimal，但最多一个 least。

---

## 14. Minimal and Maximal Elements with Divisibility Relation

**考点：** 参数型整除偏序、阈值 `n0`、least element、minimal elements 数量。

**典型题形：**

```text
T={n∈N : n0<n and n=2^i3^j}
```

问：

```text
largest n0 for which (T,|) has a least element
largest n0 so that (T,|) has at most two minimal elements
```

**零基础理解：**

T 是所有大于 `n0` 的形如 `2^i3^j` 的数。

least element 必须整除 T 中所有数。

对只含 `2^i3^j` 的集合，最小的指数点可能成为 minimal elements。

**做题思路：**

把每个数写成指数坐标：

```text
2^i3^j ↔ (i,j)
```

整除关系变成：

```text
(i,j) ≤ (r,s) iff i≤r and j≤s
```

所以 minimal elements 是坐标平面中被阈值切掉后“左下边界”的点。

**least element 什么时候存在？**

如果 T 中存在一个元素 `(i0,j0)`，满足它坐标都不大于其他所有元素：

```text
i0≤i and j0≤j for all elements
```

它就是 least。

通常这要求 T 里最小的可用数是某个纯粹低指数点，并且所有其他数都是它的倍数。

**常见坑：**

- 数值最小不一定是 least，必须整除所有其他元素。
- “at most two minimal elements” 要看被 `n0` 排除后边界剩几个。

---

## 15. Interpreting a Hasse Diagram

**考点：** Hasse 图、偏序方向、maximal/minimal、LUB、GLB。

**典型题形：**

给 Hasse diagram 的边：

```text
{[a,c],[b,d],[b,e],...}
```

问：

```text
d⪯h true?
maximal elements?
least upper bound of b and d?
greatest lower bound of d and h?
```

**零基础理解：**

Hasse 图里通常越往上表示越大。

如果有一条向上的路径从 x 到 y，那么：

```text
x⪯y
```

**做题步骤：**

1. 判断 `x⪯y`：

   看有没有从 x 往上走到 y 的路径。

2. maximal elements：

   没有任何元素在它上面。

3. minimal elements：

   没有任何元素在它下面。

4. upper bound of x,y：

   同时在 x 和 y 上方的元素。

5. least upper bound：

   所有共同上界中最低的那个。

6. lower bound：

   同时在 x 和 y 下方的元素。

7. greatest lower bound：

   所有共同下界中最高的那个。

**常见坑：**

- Hasse 图没有画自反边，但偏序默认 `x⪯x`。
- 如果问 upper bound of b and d，因为 `b⪯d`，那么 d 本身就是一个上界。
- LUB/GLB 不一定存在。

---

## 16. Examining Graphs Defined by Hasse Diagrams Representing the Divisibility Relation

**考点：** 整除偏序的 Hasse 图、覆盖关系、图的边数、构造 K2,2 和 C5。

**典型题形：**

```text
S={1,2,5,6,8,9,10,12,18}
H = Hasse diagram graph for (S,|)
```

问：

```text
H 有多少边？
某个顶点的 degree？
找 A⊆Z+ 使 Hasse diagram isomorphic to K2,2
找 B⊆Z+ 使 Hasse diagram isomorphic to C5
为什么不可能有 3-cycle？
```

**零基础理解：**

在整除 Hasse 图里，a 和 b 之间有边，表示：

```text
a|b
且不存在 c∈S 使 a|c|b 且 c 不等于 a,b
```

这叫覆盖关系。

**数边步骤：**

1. 对每个元素 a，找集合中 a 的倍数 b。
2. 删除那些中间还有 c 的关系。
3. 剩下的就是 Hasse 图边。

**顶点 degree：**

数和这个元素直接有 Hasse 边的元素个数。

**构造 K2,2：**

K2,2 是上下各两个点，中间四条边。

整除偏序中常用：

```text
{2,3,10,15}
```

因为：

```text
2|10, 2 不整除 15
3|15, 3 不整除 10
```

这个例子不够 K2,2。更好用：

```text
{2,3,30,42}
```

这里：

```text
2|30, 2|42
3|30, 3|42
```

且没有中间元素放进去，所以 Hasse 图就是 K2,2。

**构造 C5：**

Hasse 图来自偏序，作为无向图可以有较长 cycle。
一个常见方法是用交替上下关系构造五边形，但整除偏序的 Hasse 图必须是 bipartite by rank 的时候不一定能有奇环。事实上 Hasse 图作为无向图不可能有 3-cycle，但可以有更长 cycle；C5 是否可作为整除 Hasse 图要非常小心。

如果题目要求找 C5，通常课程里可能允许某些特殊构造；但对于真正的偏序 Hasse 图，无向图一定不含三角形，但并非所有奇环都不可能。做这种构造题时最好画出要求的覆盖关系再配数。

**为什么没有 3-cycle：**

如果有三个点形成三角形，必有一条边表示较小到较大。但三角形中会出现中间元素，导致最长那条关系不是覆盖关系，矛盾。

**常见坑：**

- Hasse 图的边不是所有整除关系。
- 如果 `1|2|4`，那么 1 和 4 之间没有 Hasse 边。

---

## 17. Comparing Hasse Diagrams and Unsimplified Diagrams for a Partially Ordered Set

**考点：** Hasse 图 vs 关系箭头图、transitive edges、自反边。

**题目意思：**

Hasse 图是“简化图”：

- 不画自反边；
- 不画能由传递性推出的边；
- 只画覆盖关系。

unsimplified diagram 是标准关系图：

- 会包含所有 `a⪯b` 的边；
- 通常包括自反 loops，除非题目说 edge 不算 loop，要看课程约定。

**做题步骤：**

对整除偏序：

1. Hasse edges：只数 covering pairs。
2. Unsimplified edges：数所有有 `a|b` 的 ordered pairs 或 directed arrows。

如果题目中说 Hasse 有 9 edges，unsimplified 有 19 edges，多出来的边来自：

- 自反关系 `a⪯a`；
- 或传递关系 `a⪯c` when `a⪯b⪯c`；

具体看他们定义的 unsimplified 是否画 loops。

**最大 unsimplified edges：**

在一个 n 元素全序中，所有可比较关系最多。

如果包括自反：

```text
n(n+1)/2
```

如果不包括自反连接线：

```text
n(n-1)/2
```

**有 greatest element 的最少 unsimplified edges：**

若包括自反：

- 每个元素都有 loop：n 条；
- 每个非 greatest 元素都要指向 greatest：n-1 条；

总：

```text
2n-1
```

若不包括自反：

```text
n-1
```

**常见坑：**

- Hasse 图和关系图不是同一个东西。
- Hasse 图省略了自反和传递边。
- 题目说 “edges” 是否包括 loops 要看上下文。

---

## 18. Examining Logical Implication as a Partial Order on a Set of Propositions

**考点：** 命题集合上的偏序、逻辑蕴含、上下界、least/greatest。

**典型题形：**

```text
S={p, q, p∧q, p∨q, p⊕¬q, ¬p∨q, ¬q, p→¬q}
R defined by xRy iff x⇒y
```

**零基础理解：**

这里的“≤”是：

```text
x ≤ y means x implies y
```

也就是说 x 更强，y 更弱。

例如：

```text
p∧q ⇒ p
p∧q ⇒ q
p ⇒ p∨q
q ⇒ p∨q
```

所以在这个偏序中：

- 越具体、越强的命题越低；
- 越容易为真的命题越高。

**证明 R 是 partial order：**

1. Reflexive：

   ```text
   x⇒x
   ```

2. Antisymmetric：

   如果 `x⇒y` 且 `y⇒x`，则 x 和 y 逻辑等价。

   题目提示可假设 S 中没有两个不同 statement 逻辑等价，所以 `x=y`。

3. Transitive：

   如果 `x⇒y` 且 `y⇒z`，则 `x⇒z`。

**判断 ordered pair 是否在 R：**

检查左边是否蕴含右边。

可以用真值表，也可以用逻辑化简。

**上下界：**

对 `p` 和 `q`：

- lower bound 是能推出 p 和 q 的命题。
- `p∧q` 能推出 p，也能推出 q，所以是 lower bound。
- 它还是 greatest lower bound，因为任何能推出 p 和 q 的命题也能推出 `p∧q`。

因此：

```text
p∧q 是 p 和 q 的 greatest lower bound
```

不是 upper bound。

**least element：**

least element 要能推出所有命题，也就是永假命题。

例如：

```text
p∧¬p
```

或者：

```text
(p↔q)∧(p⊕q)
```

因为 `p↔q` 和 `p⊕q` 不能同时真。

**greatest element：**

能被所有命题推出的，是永真命题。

例如：

```text
p∨¬p
```

**常见坑：**

- 在蕴含偏序中，`p∧q` 是下界，不是上界。
- 永假是 least，永真是 greatest。

---

## 19. Minimal and Maximal Elements of a Partial Order on Partial Orders

**考点：** partial orders 的集合、按子集包含排序、least element、maximal elements。

**典型题形：**

```text
P = set of all partial orders on S={4,5,...,17}
(P,⊆)
```

问：

```text
least element cardinality
Q={R∈P : 13R12R11R...R7}
least element of (Q,⊆)
whether ≥ is in P or Q
number of maximal elements
```

**零基础理解：**

一个 partial order 是一堆 ordered pairs。

任何 partial order 都必须有所有自反 pair：

```text
(x,x) for all x∈S
```

所以在所有 partial orders 中，最小的那个就是 equality relation：

```text
{(x,x): x∈S}
```

如果 `|S|=14`，least element 的 cardinality 是 14。

**带限制的 Q：**

如果要求：

```text
13 R 12 R 11 R 10 R 9 R 8 R 7
```

意思是这些关系都要存在：

```text
13R12, 12R11, ..., 8R7
```

由于传递性，还必须加入：

```text
13R11, 13R10, ..., 12R10, ...
```

所以 least element of Q 是：

```text
identity pairs + all forced transitive pairs in that chain
```

一条 7 个元素的链包含：

```text
C(7,2)=21
```

个非自反可比较 pair。

再加全部 14 个自反 pair：

```text
14+21=35
```

**`≥` 是否在 P/Q：**

在数字集合上，`≥` 是 partial order，所以在 P。

但它是否在 Q 要看是否满足：

```text
13 ≥ 12 ≥ 11 ≥ ... ≥ 7
```

这是真的，所以 `≥∈Q`。

**maximal elements of (Q,⊆)：**

在 partial orders 按包含排序时，maximal 通常是不能再加入任何比较关系的偏序。

在有限集合上，这通常对应 total orders / linear extensions，且要包含指定链。

若 S 有 14 个元素，并要求 7 个元素顺序固定，那么 maximal elements 数量等于把这条固定链和其余 7 个单独元素合并成全序的数量：

```text
14! / 7!
```

因为固定链内部顺序不能变。

**常见坑：**

- partial order 必须自反，所以最小大小至少是 |S|。
- 有链限制时别忘了传递性强迫加入所有跨越关系。

---

## 20. Examining a Partial Order Defined by Subgraphs

**考点：** 子图关系、partial order、unlabelled graphs、least/greatest、Hasse 图计数。

**典型题形：**

```text
G⪯H iff G is a subgraph of H
```

**证明 partial order：**

1. Reflexive：

   每个图都是自己的子图。

2. Antisymmetric：

   如果 G 是 H 的子图，H 也是 G 的子图，则二者边和点相同，所以是同一个图。

3. Transitive：

   如果 G 是 H 的子图，H 是 K 的子图，则 G 是 K 的子图。

**S8：所有 8 个顶点的 unlabelled graphs**

least element：

```text
8 个孤立点，无边图
```

greatest element：

```text
K8
```

**labelled graphs with fixed 7 vertices：**

总可能边数：

```text
C(7,2)=21
```

每个 labelled graph 对应这 21 条边的一个子集。

Hasse diagram 中两个图相连，当且仅当一个比另一个多一条边。

每条 Hasse 边对应：

```text
选择一个图 edge subset E，再选择一条不在 E 中的边加入
```

总数：

```text
21 * 2^20
```

因为每一条可能边在 Hasse 图中作为“新增的那条边”，其他 20 条边任意。

**常见坑：**

- labelled 和 unlabelled 不同。
- Hasse 连接线只差一条边。
- `S4` unlabelled graph 有 11 个，需要按图形分类数覆盖关系。

---

## 21. Counting Relations Given Particular Subsets

**考点：** 关系扩张、reflexive/symmetric/antisymmetric/transitive closure。

**典型题形：**

```text
S={1,2,3,4,5}
A⊆S×S
问有多少 B⊆S×S 满足 A⊆B 且 B reflexive/symmetric/antisymmetric/transitive
```

**零基础理解：**

B 是在 A 的基础上继续加 ordered pairs。

所以：

```text
A⊆B
```

意味着 A 中已有的 pair 不能删。

**reflexive：**

必须包含所有：

```text
(1,1),(2,2),(3,3),(4,4),(5,5)
```

做法：

1. 看 A 已经包含哪些 diagonal pairs。
2. 缺的必须加入。
3. 其他未决定 pairs 可选可不选。

如果总共有 25 个 pairs，强制集合大小为 r，那么答案：

```text
2^(25-r)
```

**symmetric：**

如果 `(a,b)` 在 B，则 `(b,a)` 也要在 B。

做法：

1. 把 off-diagonal pair 按 unordered pair `{a,b}` 分组。
2. 如果 A 中有一个方向，则 B 必须包含两个方向。
3. 如果 A 中两个方向都没有，则这一组可以“不选”或“两边都选”。
4. diagonal pairs 自己对称，可自由或已强制。

**antisymmetric：**

对 `a≠b`，不能同时有 `(a,b)` 和 `(b,a)`。

如果 A 已经同时含有某对双向 pair，则无解。

否则每个未冲突的 unordered pair 看 A 是否强制了一个方向：

- 已强制一个方向：另一个方向不能选；
- 都没强制：可选 none、one direction、the other direction，共 3 种；
- diagonal pairs 任意或已强制。

**transitive：**

要求：

```text
如果 (a,b),(b,c)∈B，则 (a,c)∈B
```

最小 possible cardinality 是 A 的 transitive closure 的大小。

做法：

1. 从 A 开始。
2. 只要有 `(a,b)` 和 `(b,c)`，就加入 `(a,c)`。
3. 重复直到没有新 pair。
4. 最后大小就是最小 transitive B。

**常见坑：**

- symmetric 是成对加入；
- antisymmetric 不是不能有 diagonal；
- transitive closure 要反复做，不是只做一次。

---

## 22. Counting Relations with or without Particular Properties

**考点：** 关系计数、自反、对称、反对称、等价关系、非某性质。

**典型题形：**

```text
|A|=8, count relations both symmetric and antisymmetric
|B|=14, count antisymmetric but not symmetric
|C|=5, count neither reflexive nor symmetric
```

**基础公式：**

在 n 元集合上，所有关系数量：

```text
2^(n^2)
```

因为关系是 `A×A` 的任意子集。

**reflexive：**

对角线 n 个必须有，其余任意：

```text
2^(n^2-n)
```

**symmetric：**

对角线 n 个任意；
非对角线按 unordered pair 成组，共 `C(n,2)` 组，每组要么两个都没有，要么两个都有。

```text
2^(n + C(n,2))
```

**antisymmetric：**

对角线 n 个任意；
每对不同元素 `{a,b}` 有 3 种：

```text
none
(a,b) only
(b,a) only
```

所以：

```text
2^n * 3^C(n,2)
```

**both symmetric and antisymmetric：**

不同元素之间不能有边，因为 symmetric 会要求双向，但 antisymmetric 禁止双向。

所以只能选 diagonal：

```text
2^n
```

**antisymmetric but not symmetric：**

```text
antisymmetric total - both symmetric and antisymmetric
= 2^n*3^C(n,2) - 2^n
```

**neither reflexive nor symmetric：**

用容斥：

```text
total - reflexive - symmetric + both reflexive and symmetric
```

其中：

```text
both reflexive and symmetric = 2^C(n,2)
```

因为 diagonal 全强制，off-diagonal 成组自由。

**等价关系：**

等价关系对应 set partition。

如果还限制 `|R|=16`，要按 equivalence classes 大小算：

一个等价类大小为 k，会贡献 `k^2` 个 ordered pairs。

所以要找分拆：

```text
k1+...+kr=n
k1^2+...+kr^2=|R|
```

然后数这种分班方式。

**常见坑：**

- symmetric and antisymmetric 可以有 `(a,a)`。
- equivalence relation 不是随便选 pair，而是把集合分成若干类。

---

## 23. Counting Reflexive and Antisymmetric Relations

**考点：** 关系计数公式。

这个 title 通常是上一节的简化版。

**直接记：**

若集合大小为 n：

```text
reflexive relations = 2^(n^2-n)
antisymmetric relations = 2^n * 3^C(n,2)
reflexive and antisymmetric = 3^C(n,2)
```

为什么最后一个没有 `2^n`？

因为 reflexive 已经强制所有 diagonal 必须选，所以 diagonal 没有自由度。

---

## 24. Square Relation

**考点：** 关系性质：symmetric、antisymmetric、transitive。

**典型题形：**

```text
a R b iff a = b^2
```

关系在整数集上。

**判断 symmetric：**

如果 `a=b^2`，是否一定有 `b=a^2`？

不是。

例：

```text
4 R 2，因为 4=2^2
但 2 R 4 要求 2=4^2，不成立
```

所以不 symmetric。

**判断 antisymmetric：**

如果 `aRb` 且 `bRa`，则：

```text
a=b^2
b=a^2
```

代入可得：

```text
a=a^4
```

整数解会导致 a=b，通常成立。

所以 antisymmetric。

**判断 transitive：**

如果：

```text
a=b^2
b=c^2
```

则：

```text
a=(c^2)^2=c^4
```

要有 `aRc` 需要：

```text
a=c^2
```

不一定。

例：

```text
16 R 4, 4 R 2, but 16 R 2? 16=2^2? no
```

所以不 transitive。

**常见坑：**

- transitive 不是把等式随便连起来，要满足同一个关系形式。

---

## 25. Proving Properties of a Relation Defined by Two Others ("or" version)

**考点：** 关系并集、reflexive、antisymmetric、反例。

**典型题形：**

```text
xTy iff xRy or xSy
```

这就是：

```text
T = R ∪ S
```

**Statement 1：如果 R reflexive 或 S reflexive，则 T reflexive。**

真。

因为如果 R reflexive，则每个 `(x,x)∈R`，因此也在 `T=R∪S`。

**Statement 2：如果 T reflexive，则 R reflexive 或 S reflexive。**

假。

反例：

在 `{1,2}` 上：

```text
R={(1,1)}
S={(2,2)}
```

则：

```text
T={(1,1),(2,2)}
```

T reflexive，但 R 和 S 都不 reflexive。

**Statement 3：如果 T antisymmetric，则 R 和 S 都 antisymmetric。**

真。

因为 R 和 S 都是 T 的子集。如果 R 中有反对称性冲突，那么 T 也会有冲突。

**常见坑：**

- 并集有性质，不代表其中某一个单独有性质。
- 但如果大关系 T antisymmetric，那么它的子关系一定 antisymmetric。

---

## 26. Proving Properties of a Relation Defined by Two Others ("and" version)

**考点：** 关系合成、transitive、`Q⊆P`。

**题目定义：**

```text
xQy iff exists z∈B such that xPz and zPy
```

这其实是关系复合：

```text
Q = P∘P
```

表示从 x 经 P 走两步到 y。

**要求证明：**

```text
P is transitive iff Q⊆P
```

**证明方向 1：P transitive ⇒ Q⊆P**

任取 `(x,y)∈Q`。

根据 Q 定义，存在 z：

```text
xPz and zPy
```

因为 P transitive，所以：

```text
xPy
```

所以 `(x,y)∈P`。

因此 `Q⊆P`。

**证明方向 2：Q⊆P ⇒ P transitive**

要证明 P transitive：

假设：

```text
xPz and zPy
```

根据 Q 定义：

```text
xQy
```

又因为 `Q⊆P`，所以：

```text
xPy
```

这正是 transitive。

**常见坑：**

- 这里 Q 不是 P 的子集自动成立，而是刚好等价于传递性。
- 证明 iff 要写两个方向。

---

## 27. Examining Functions with Left Inverses

**考点：** 函数复合、injective、反例、证明。

**典型题形：**

命题：

```text
for all f,g,h:R→R, if f∘g=f∘h then g=h
```

这个命题一般是假，除非 f 是 injective。

**零基础理解：**

如果 f 不单射，它会把两个不同输入压成同一个输出。

那么即使 g 和 h 不同，只要它们的输出被 f 压成一样，就可能有：

```text
f∘g = f∘h
```

但：

```text
g≠h
```

**证明 f injective 时命题成立：**

假设：

```text
f∘g=f∘h
```

任取 x：

```text
f(g(x))=f(h(x))
```

因为 f injective，所以：

```text
g(x)=h(x)
```

对所有 x 成立，所以：

```text
g=h
```

**反过来证明：如果这个性质对所有 g,h 成立，则 f injective。**

要证明 f injective，假设：

```text
f(x1)=f(x2)
```

定义常值函数：

```text
g(x)=x1
h(x)=x2
```

则：

```text
f(g(x))=f(x1)=f(x2)=f(h(x))
```

所以 `f∘g=f∘h`。

由假设得到 `g=h`，因此 `x1=x2`。

所以 f injective。

**常见坑：**

- `f∘g=f∘h` 不能直接 cancel f，除非 f injective。
- 证明函数相等，要证明对所有 x 输出相等。

---

## 28. Injectivity and Surjectivity with the Floor Function

**考点：** floor 函数、单射、满射、复合函数、反函数。

**典型题形：**

```text
f:Z→Z, f(x)=2x+3
g:Z→Z, g(y)=floor((y-1)/2)
```

**证明 f 不满射：**

`2x+3` 永远是奇数，所以偶数取不到。

例如：

```text
0 不在 f 的值域中
```

所以 f not surjective。

**证明 g 不单射：**

找两个不同输入输出一样。

例如：

```text
g(1)=floor(0)=0
g(2)=floor(1/2)=0
```

所以不 injective。

**复合：**

```text
(g∘f)(x)=g(2x+3)
=floor((2x+3-1)/2)
=floor(x+1)
=x+1
```

因为 x 是整数。

```text
(f∘g)(x)=2*floor((x-1)/2)+3
```

**反函数：**

如果：

```text
(g∘f)(x)=x+1
```

那么：

```text
(g∘f)^(-1)(x)=x-1
```

**为什么 f∘g 没反函数：**

因为 g 不单射，通常 f∘g 也不单射。

比如：

```text
(f∘g)(1)=(f∘g)(2)
```

所以没有 inverse function。

---

## 29. Injectivity and Surjectivity with Modular Function

**考点：** 模 m 函数、单射、满射、gcd。

**典型题形：**

```text
X={0,1,...,m-1}
f:X→X
f(x)=33x mod m
```

问找 m 使 f injective / not surjective。

**核心结论：**

乘法函数：

```text
x ↦ ax mod m
```

在 `{0,...,m-1}` 上是 bijection 当且仅当：

```text
gcd(a,m)=1
```

因为 a 有模 m 逆元。

所以：

- injective iff surjective iff `gcd(33,m)=1`。
- not surjective iff `gcd(33,m)>1`。

**33 的因数：**

```text
33=3*11
```

所以：

- 选不被 3 或 11 整除的 m，可 injective；
- 选被 3 或 11 整除的 m，可 not surjective。

**常见坑：**

- 有限集合 `X→X` 中 injective 和 surjective 等价。
- 不是看 33 是否大于 m，而是看 gcd。

---

## 30. Examining a Function Defined by Modular Arithmetic and Divisibility

**考点：** 函数模 m、逆元、单射满射、质数因子。

这类题通常和上一题类似。

**通用模板：**

若：

```text
f(x)=ax mod m
```

则：

```text
f is bijective ⇔ gcd(a,m)=1
```

若 domain/codomain 有限且大小相同：

```text
injective ⇔ surjective ⇔ bijective
```

如果要找 preimage：

```text
ax≡y mod m
```

用线性同余方法：

1. 算 `g=gcd(a,m)`。
2. 若 `g∤y`，无解。
3. 若有解，除以 g，再求逆元。

---

## 31. Bijections from R to R

**考点：** 实函数双射、严格单调、极限、复合函数构造。

**典型题形：**

```text
b(x)=6x^25+8x^17+11x-3
B={bijections R→R}
F:B→B, F(f)=b∘f
```

**证明 b∈B：**

要证明 b 是双射。

常用路线：

1. b 连续。
2. b 严格递增。

   求导：

   ```text
   b'(x)=150x^24+136x^16+11
   ```

   每项非负且 `+11`，所以：

   ```text
   b'(x)>0
   ```

   因此 b strictly increasing，故 injective。

3. 因为最高次是奇数且正系数：

   ```text
   x→∞, b(x)→∞
   x→-∞, b(x)→-∞
   ```

   加上连续，由 IVT 得到 surjective。

**证明 F:B→B 是 bijection：**

```text
F(f)=b∘f
```

因为 b 和 f 都是 bijections，所以 `b∘f` 也是 bijection。

证明 F injective：

如果：

```text
F(f)=F(g)
b∘f=b∘g
```

因为 b injective，cancel b：

```text
f=g
```

证明 F surjective：

任取 `h∈B`，要找 f 使：

```text
b∘f=h
```

令：

```text
f=b^{-1}∘h
```

则：

```text
b∘f=b∘b^{-1}∘h=h
```

**常见坑：**

- 证明 onto R→R 不能只说最高次奇数，最好加连续和 IVT。
- 复合 bijection 仍是 bijection。

---

## 32. Bijective Functions, Composition, and Equivalence Proofs

**考点：** 有限集合、surjective implies bijective、函数迭代、轨道、等价关系。

**典型题形：**

```text
A finite, |A|=n≥1
f:A→A surjective
given f bijective
prove for each a∈A, exists k≥1 such that f^k(a)=a
define a∼b iff b=f^k(a) for some k≥0
prove equivalence relation
```

**零基础理解：**

如果 f 是 finite set 上的 bijection，它只是把 A 的元素重新排列。

不断对 a 用 f：

```text
a, f(a), f^2(a), f^3(a), ...
```

因为 A 有限，迟早会重复。

由于 f 是 bijection，这个轨道会形成一个循环，所以最后会回到 a。

**part (a) 证明模板：**

考虑 n+1 个元素：

```text
a, f(a), f^2(a), ..., f^n(a)
```

它们都在 n 元集合 A 中。

由抽屉原理，有两个相同：

```text
f^i(a)=f^j(a), i<j
```

因为 f bijective，所以可以对两边应用 inverse i 次：

```text
a=f^(j-i)(a)
```

令：

```text
k=j-i≥1
```

即可。

**part (b) 等价关系：**

定义：

```text
a∼b iff b=f^k(a) for some k≥0
```

证明三性质：

1. Reflexive：

   取 `k=0`：

   ```text
   f^0(a)=a
   ```

2. Symmetric：

   如果 `b=f^k(a)`，由于 a 在循环里，存在 m 使 `f^m(a)=a`。

   那么从 b 再走 `m-k` 步会回到 a。

3. Transitive：

   如果：

   ```text
   b=f^k(a)
   c=f^l(b)
   ```

   则：

   ```text
   c=f^l(f^k(a))=f^(k+l)(a)
   ```

   所以 `a∼c`。

**常见坑：**

- symmetry 需要用 part (a) 的循环性质。
- `k` 是 non-negative，所以 reflexive 用 k=0。

---

## 33. Injectivity and MATH1081 Students

**考点：** 函数不单射、抽屉原理、图论度数想法。

**典型题形：**

```text
R={MATH1081 students}
u(r)=number of other students who exchanged email addresses with r
prove u is not injective
```

**零基础理解：**

u 的输出是一个数字，表示这个学生有多少个“联系对象”。

如果班上有 n 个学生，那么每个人的 u 值只能是：

```text
0,1,2,...,n-1
```

看起来有 n 个可能值，似乎可能 injective。

但关键是：

不可能同时有人是 0，又有人是 n-1。

因为：

- 有人是 n-1 表示 TA 和所有其他人都交换了；
- 那么每个人至少和 TA 交换过；
- 所以不可能有人是 0。

因此可能值最多只有 n-1 个，但有 n 个学生。

由抽屉原理，至少两人 u 值相同，所以不 injective。

**常见坑：**

- 不能只说“人多值少”，因为表面上都是 n 个。
- 要指出 0 和 n-1 不能同时出现。

---

## 34. A Guided Proof that a Cubic Function is Surjective

**考点：** onto/surjective、IVT、中间值定理、分情况证明。

**典型题形：**

```text
f(x)=(x-3)(x-6)(x+6)+x
prove f:R→R is onto
```

**零基础理解：**

要证明 onto：

```text
任意给一个 y∈R，都要找到 x 使 f(x)=y
```

这类三次函数通常用 IVT：

如果能找到 a,b 使：

```text
f(a)≤y≤f(b)
```

那么连续函数在 [a,b] 中会取到 y。

**题目给的关键：**

如果 `y≥6`，证明：

```text
y≤f(y)
```

又通常可以取：

```text
a=6, b=y
```

因为 f(6)=6，所以：

```text
f(6)=6≤y≤f(y)
```

如果 `y≤-6`，证明：

```text
f(y)≤y
```

取：

```text
a=y, b=-6
```

因为 f(-6)=-6，所以：

```text
f(y)≤y≤-6=f(-6)
```

如果 `-6<y<6`，取：

```text
a=-6, b=6
```

因为：

```text
f(-6)=-6, f(6)=6
```

所以 y 在中间。

**常见坑：**

- onto 的变量最好用 y 表示目标值，x/c 表示要找的输入。
- IVT 要用连续性。
- 三个 case 覆盖所有实数 y。

---

## 35. Proving whether or not a Sum of Fractional Parts is Periodic

**考点：** 周期函数、fractional part、整数平移、反证法、无理数。

**典型题形：**

```text
f(x)=frac(x/95)+frac(x/120)
prove periodic
```

**零基础理解：**

`frac(t)` 只看小数部分。

如果给 t 加一个整数，小数部分不变：

```text
frac(t+n)=frac(t)
```

**证明 periodic：**

要找 P>0，使：

```text
f(x+P)=f(x)
```

如果：

```text
P/95 是整数
P/120 是整数
```

就可以。

所以选：

```text
P=lcm(95,120)
```

**非周期例子：**

```text
f(x)=frac(x/79)+frac(x/sqrt(8))
```

若有周期 P，则通常从 `x=0` 得到：

```text
frac(P/79)+frac(P/sqrt(8))=0
```

因为 fractional part 非负，所以两项都必须是 0。

于是：

```text
P/79=m
P/sqrt(8)=n
```

所以：

```text
sqrt(8)=79m/n
```

右边有理数，左边无理数，矛盾。

**常见坑：**

- 周期 P 不一定是最小周期，找一个能用的即可。
- 两个非负数相加为 0，则每个都是 0。

---

## 36. Sum of Floor and Ceiling Proof

**考点：** floor、ceil、整数、当且仅当证明。

**典型题形：**

```text
x is an integer iff floor(0.115x)+ceil(0.885x)=x
```

**零基础理解：**

左边一定是整数，因为 floor 和 ceil 都给整数。

所以如果：

```text
floor(0.115x)+ceil(0.885x)=x
```

那么 x 一定是整数。

这是一个方向。

**另一个方向：**

如果 x 是整数，设：

```text
a=0.115x
b=0.885x
```

则：

```text
a+b=x
```

因为 x 是整数，所以：

```text
ceil(b)=x-floor(a)
```

因此：

```text
floor(a)+ceil(b)=x
```

**完整证明结构：**

1. Suppose x is an integer.
2. Since `0.115x+0.885x=x` and x integer, use identity:

   ```text
   ceil(x-a)=x-floor(a)
   ```

3. Therefore equality holds.
4. Conversely, suppose equality holds.
5. LHS is integer, so RHS x is integer.

**常见坑：**

- iff 一定要双向。
- 不要用小数近似制造误差；可以把 0.115 写成 115/1000。

---

## 37. Examining Sets of Integer Functions / Cardinalities of Power Sets

**适用 title：**

- Integer Sets, Cardinalities, and Functions
- Counting Functions Between Sets with Given Cardinalities
- Functions Mapping to and from Equivalence Classes
- Relations as Functions

**总公式速查：**

```text
|P(A)| = 2^|A|
|A×B| = |A|*|B|
number of functions A→B = |B|^|A|
number of injective functions A→B = P(|B|,|A|)
number of bijections A→B = |A|! if |A|=|B|, else 0
```

**满射容斥：**

```text
onto A→B
= Σ_{j=0}^{|B|} (-1)^j C(|B|,j)(|B|-j)^|A|
```

当 `|A|<|B|` 时为 0。

---

## 第一批复习建议

如果你完全没学过，先按这个顺序看：

1. Favourite Sets Comparison  
   学会 `∈,⊆,P(A),A×B`。

2. Functions as Sets and Their Properties  
   学会函数就是 ordered pairs。

3. Counting Functions Between Sets with Given Cardinalities  
   学会函数数量公式。

4. Counting Relations with or without Particular Properties  
   学会关系计数。

5. Divisibility with Maximal, Minimal, Greatest, and Least Elements  
   学会偏序语言。

6. Interpreting a Hasse Diagram  
   学会从图读偏序。

7. Examining Logical Implication as a Partial Order  
   把逻辑和偏序连起来。

8. Bijective Functions, Composition, and Equivalence Proofs  
   学会证明题的标准写法。

---

## 第一批常用词汇中英对照

```text
set 集合
element 元素
subset 子集
power set 幂集
Cartesian product 笛卡尔积
cardinality 基数/元素个数
relation 关系
function 函数
domain 定义域
codomain 陪域
image 像
preimage 原像
injective / one-to-one 单射
surjective / onto 满射
bijective 双射
equivalence relation 等价关系
equivalence class 等价类
partial order 偏序
minimal element 极小元
maximal element 极大元
least element 最小元
greatest element 最大元
upper bound 上界
lower bound 下界
least upper bound 最小上界
greatest lower bound 最大下界
Hasse diagram 哈asse图/偏序覆盖图
```

---

# 第二批：逻辑、证明、量词、归纳法

这一批题的共同特点是：它们不一定需要大量计算，但非常考“符号是什么意思”和“证明结构是否正确”。如果你刚开始学，先把下面四句话背熟：

```text
P→Q 只有 P 真 Q 假时为假
P→Q 等价于 ¬P∨Q
P→Q 的逆否命题是 ¬Q→¬P
证明 P iff Q 要证明 P→Q 和 Q→P 两个方向
```

---

## 38. Complete Truth Table

**考点：** 真值表、蕴含、双条件。

**典型题形：**

```text
[p→(q→r)] ↔ [(p∧q)→r]
```

要求补完整个 truth table，并判断它是什么。

**零基础理解：**

真值表就是把所有可能的真假组合都列出来，然后一步一步算复合命题真假。

三个变量 `p,q,r` 一共有：

```text
2^3=8
```

行。

**最重要规则：**

```text
P→Q 只有一种情况是假：P=T, Q=F
```

其他情况都是真。

`P↔Q` 是：

```text
P 和 Q 一样真值时为 T
P 和 Q 不一样时为 F
```

**做题步骤：**

1. 先算 `q→r`。
2. 再算 `p→(q→r)`。
3. 算 `p∧q`。
4. 再算 `(p∧q)→r`。
5. 最后比较左右两边，算 `↔`。

**关键结论：**

```text
p→(q→r)
```

和：

```text
(p∧q)→r
```

逻辑等价。这叫 exportation / importation。

所以整个：

```text
[p→(q→r)]↔[(p∧q)→r]
```

是 tautology，永真式。

**常见坑：**

- `q→r` 不是 `q∧r`。
- 当前件为 false 时，implication 自动 true。
- `↔` 不是“推出”，而是“两边等价”。

---

## 39. Complete Truth Table / Grace Truth Table

**考点：** `∨`、`¬`、蕴含。

**典型题形：**

```text
p∨¬q∨r
p∨q∨¬r
(p∨¬q∨r)→(p∨q∨¬r)
```

**零基础理解：**

`∨` 是“或”，只要有一个真，整体就真。

所以：

```text
p∨¬q∨r
```

只有在：

```text
p=F, ¬q=F, r=F
```

时才是假。也就是：

```text
p=F, q=T, r=F
```

**做题步骤：**

1. 对每一行先算 `¬q` 和 `¬r`。
2. 算两个大括号：

   ```text
   A=p∨¬q∨r
   B=p∨q∨¬r
   ```

3. 最后算：

   ```text
   A→B
   ```

   只有 `A=T, B=F` 时是假。

**常见坑：**

- 三个或连在一起，不要按“恰好一个真”理解；那是 xor。
- implication 的真假永远最后算。

---

## 40. Partial Truth Table

**考点：** 根据部分真值表反推命题。

**典型题形：**

给：

```text
p q X
T T ?
T F ?
F T F
F F F
```

然后给几个候选：

```text
p⊕¬q
¬p∧¬q
p∧q
p∧¬q
```

让你选哪些可能是 X。

**零基础理解：**

部分真值表的意思是：

已经填出来的地方必须匹配；
没填的地方可以是 T 或 F。

**做题步骤：**

1. 对每个候选命题写出完整真值表。
2. 只检查题目已经给出的行。
3. 如果某个候选在已知行出现冲突，就排除。
4. 如果没有冲突，就可以选择。

**例子：**

如果已知：

```text
F,T → F
F,F → F
```

那么候选 `p∧q`：

```text
F∧T=F
F∧F=F
```

没有冲突，所以可能。

**常见坑：**

- 不需要候选和空白处的“猜测”一致，因为空白还没定。
- `⊕` 是 exclusive or，两个命题恰好一个真时为真。

---

## 41. Truth Table - Complete and Count Possibilities

**考点：** 真值表补全、计数、至少一列无 F。

**典型题形：**

部分 truth table 有 9 个空格，问随机填 T/F 后，有多少表至少一列没有 F。

**零基础理解：**

这种题本质是计数题，不是逻辑推理题。

如果有 9 个空格，每个空格有 2 种选择，总数：

```text
2^9
```

“至少一列没有 F”就是“至少一列全是 T”。

**做题步骤：**

1. 找出哪些列有空格，哪些已知 T/F。
2. 如果某列已经有 F，那么它不可能“无 F”。
3. 对可能全 T 的列，用容斥：

   ```text
   |A∪B∪C| = |A|+|B|+|C|-|A∩B|-...+|A∩B∩C|
   ```

4. 每强制一个空格为 T，自由空格数减少 1。

**常见坑：**

- “至少一列”用容斥，不是简单相加。
- 已经有 F 的列不可能满足条件。

---

## 42. Enumerating Ways to Complete Partial Truth Tables

**考点：** 逻辑等价、蕴含条件、二进制计数。

**典型题形：**

给 Y1、Y2 的部分 truth table，问：

```text
有多少种填法使 Y1 not logically equivalent to Y2?
```

或者给 Z1、Z2，问：

```text
有多少种填法使 Z1⇒Z2?
```

**零基础理解：**

两个命题逻辑等价，意思是每一行真值都一样。

不等价就是：

```text
至少一行不同
```

`Z1⇒Z2` 的意思是每一行都不能出现：

```text
Z1=T, Z2=F
```

**做题步骤：逻辑不等价**

1. 数所有空格填法：如果有 k 个空格，总数 `2^k`。
2. 数使 Y1 和 Y2 完全一样的填法。
3. 答案：

   ```text
   total - equivalent
   ```

**做题步骤：Z1⇒Z2**

逐行看：

- 如果某行已经是 `Z1=T, Z2=F`，则无解。
- 如果某行空格能填，排除导致 `T,F` 的填法。
- 各行独立时，把每行可行填法数相乘。

**常见坑：**

- 逻辑等价要求所有 8 行一样，不是大多数一样。
- implication 只禁止 `T→F`。

---

## 43. Compound Propositions, Truth Table, and Valid Arguments

**考点：** 命题翻译、xor、valid argument。

**典型题形：**

定义：

```text
P: If Pranay does not brunch with Liu then Lance does not game with Pranay
Q: Either Pranay does not brunch with Liu or Liu dines with Lance, but not both
```

再加一个前提：

```text
Lance games with Pranay
```

问能否推出 Pranay brunches with Liu。

**零基础理解：**

先用字母：

```text
g = Lance games with Pranay
b = Pranay brunches with Liu
d = Liu dines with Lance
```

那么：

```text
P: ¬b → ¬g
Q: ¬b ⊕ d
```

“but not both” 是 xor。

**valid argument 的意思：**

只要所有前提都为真，结论必定为真，那么 argument valid。

**做题方法 1：真值表**

找所有前提为真的行，看结论是否都真。

**做题方法 2：推理**

已知：

```text
¬b→¬g
g
```

用 Modus Tollens：

```text
b
```

因为如果不 brunch，则不 game；现在 game，所以一定 brunch。

**常见坑：**

- `Either A or B, but not both` 是 xor，不是普通 or。
- valid 不等于结论看起来合理，而是没有反例行。

---

## 44. Applying the Rules of Logical Inference

**考点：** Modus Ponens、Modus Tollens、Elimination。

**典型题形：**

```text
P1: s→¬b
P2: d∨h
P3: h→b
P4: s
```

证明：

```text
d
```

**零基础理解：**

这是标准推理链。

**规则：**

```text
Modus Ponens:
P, P→Q ⟹ Q

Modus Tollens:
P→Q, ¬Q ⟹ ¬P

Elimination:
P∨Q, ¬Q ⟹ P
```

**做题步骤：**

1. 由：

   ```text
   s
   s→¬b
   ```

   得：

   ```text
   ¬b
   ```

   规则：Modus Ponens。

2. 由：

   ```text
   h→b
   ¬b
   ```

   得：

   ```text
   ¬h
   ```

   规则：Modus Tollens。

3. 由：

   ```text
   d∨h
   ¬h
   ```

   得：

   ```text
   d
   ```

   规则：Elimination。

**常见坑：**

- `d∨h` 和 `¬h` 才能推出 d。
- Modus Tollens 是从结论假推出前件假。

---

## 45. Logical Deduction Using Given Propositions

**考点：** 命题翻译、推理规则、结论有效性。

**题型：**

和 jury duty / stolen jewel / stolen car 题相同。

**标准模板：**

令：

```text
s = stolen
b = used diversion/lockpick
d = criminal dead
h = wore disguise
```

前提：

```text
s→¬b
d∨h
h→b
s
```

推导：

```text
s and s→¬b ⟹ ¬b
h→b and ¬b ⟹ ¬h
d∨h and ¬h ⟹ d
```

所以结论 valid。

**常见坑：**

- “Either d or h” 是 `d∨h`，不是 `d→h`。
- “If disguise then used lockpick” 是 `h→b`。

---

## 46. Logical Deduction - Grading Rubric

**考点：** 条件语句、only if、xor、确定结论。

**典型题形：**

```text
Either Xavier or Yusuf will pass, but not both.
Xavier will pass only if Yusuf passes.
Warwick will pass or Zoey will fail.
Zoey will pass.
```

问哪些一定成立。

**零基础翻译：**

令：

```text
X = Xavier passes
Y = Yusuf passes
W = Warwick passes
Z = Zoey passes
```

前提：

```text
X⊕Y
X→Y
W∨¬Z
Z
```

**推理：**

`X→Y` 说如果 X pass，则 Y pass。

但 `X⊕Y` 说 X 和 Y 恰好一个 pass。

如果 X pass，那么由 `X→Y` 得 Y pass，这样两个都 pass，违反 xor。

所以：

```text
X false
Y true
```

又有：

```text
W∨¬Z
Z
```

因为 Z true，所以 `¬Z` false，因此 W true。

**确定结论：**

```text
Xavier will fail
Yusuf will pass
Zoey will pass
Warwick will pass
```

**常见坑：**

- `only if` 很容易翻译反。
- `X only if Y` 是 `X→Y`。

---

## 47. Propositional Logic and Musical Lyric Arrangements

**考点：** 命题翻译、De Morgan、Modus Tollens。

**典型题形：**

```text
a: You ask me how I'm feeling
e: You tell me I'm too blind to see
u: Sometime I will give you up
d: Sometime I will let you down
```

前提：

```text
P1: e
P2: a or not (u or d)
P3: if a then not e
```

**翻译：**

```text
P1∧P2∧P3 = e ∧ [a∨¬(u∨d)] ∧ [a→¬e]
```

**化简 P2：**

用 De Morgan：

```text
¬(u∨d) ≡ ¬u∧¬d
```

所以：

```text
a∨¬(u∨d) ≡ a∨(¬u∧¬d)
```

**从 P3 和 P1 推理：**

```text
a→¬e
e
```

因为 e 等价于 `¬(¬e)`，所以由 Modus Tollens：

```text
¬a
```

然后 P2：

```text
a∨¬(u∨d)
¬a
```

用 Elimination 得：

```text
¬(u∨d)
```

再用 De Morgan：

```text
¬u∧¬d
```

结论：

```text
You will not give them up and you will not let them down.
```

**常见坑：**

- `not (u or d)` 是 `¬u and ¬d`，不是 `¬u or ¬d`。
- `a→¬e` 和 `e` 可以推出 `¬a`。

---

## 48. Converting Statements to Symbolic Logic

**考点：** 英文句子翻译成逻辑符号。

**典型题形：**

```text
If the sun is shining or my boat is at the mooring then the harbour is inviting or my friends are happy.
```

给：

```text
s = sun shining
b = boat at mooring
h = harbour inviting
f = friends happy
```

**翻译：**

```text
(s∨b)→(h∨f)
```

**only if：**

```text
My boat is at the mooring only if the sun is not shining or the harbour is not inviting.
```

`P only if Q` 是：

```text
P→Q
```

所以：

```text
b→(¬s∨¬h)
```

也可写：

```text
b→¬(s∧h)
```

**常见坑：**

- `if P then Q` 是 `P→Q`。
- `P only if Q` 也是 `P→Q`。
- `P if Q` 是 `Q→P`。

---

## 49. Identifying Logically Equivalent Statements

**考点：** 命题等价、if/only if、逆否命题。

**典型题形：**

给 8 句话，例如：

```text
if X is not complexified, then X is skew-differentiable
X is skew-differentiable, or X is complexified
X is skew-differentiable only if X is complexified
```

要求分组。

**零基础做法：**

把长句替换成字母：

```text
S = skew-differentiable
C = complexified
```

然后逐句翻译。

**常用等价表：**

```text
if P then Q        = P→Q = ¬P∨Q
P only if Q        = P→Q
Q if P             = P→Q
P if Q             = Q→P
P→Q 的逆否命题     = ¬Q→¬P
```

**例子：**

```text
if not C then S
```

是：

```text
¬C→S
```

化简：

```text
C∨S
```

所以它等价于：

```text
S∨C
```

**常见坑：**

- `P if Q` 和 `P only if Q` 方向相反。
- “or” 通常是 inclusive or，不是 xor，除非说 but not both。

---

## 50. Contrapositive Dropdown

**考点：** 量词、否定、逆否命题。

**典型题形：**

原命题：

```text
Given positive integer x,
if x is a perfect square,
then for all prime p, there exists even integer a such that ...
```

要求写 contrapositive。

**零基础理解：**

如果原命题是：

```text
P→Q
```

逆否命题是：

```text
¬Q→¬P
```

**量词否定规则：**

```text
¬(∀p ∃a R(p,a)) = ∃p ∀a ¬R(p,a)
```

**英文结构：**

原命题：

```text
if x is perfect square, then [condition about all primes]
```

逆否：

```text
if [condition about all primes is false], then x is not a perfect square
```

**常见坑：**

- 逆否不是 converse。
- 否定 `for all` 会变成 `there exists`。
- 否定 `there exists` 会变成 `for all`。

---

## 51. Selecting Valid Proof Set Ups for an Implication Statement

**考点：** 证明 `P→Q` 的合法套路。

**典型题形：**

要证明：

```text
if X is convoluted, then X is semicompact
```

设：

```text
C = convoluted
S = semicompact
```

目标：

```text
C→S
```

问哪些 proof outlines 不可能证明。

**可以证明的套路：**

1. 直接证明：

   ```text
   Suppose C. ... Therefore S.
   ```

2. 逆否证明：

   ```text
   Suppose ¬S. ... Therefore ¬C.
   ```

3. 反证法：

   ```text
   Suppose C and ¬S. ... contradiction.
   ```

4. 假设 C 推出 ¬C：

   这其实说明 C 不可能为真，从而 `C→S` vacuously true。逻辑上可能证明，但在普通数学语境要看题目是否接受。通常这可以作为 proof by contradiction 的一部分，因为假设 C 且 ¬S 更标准。

**不可能证明的套路：**

```text
Suppose C and S. contradiction.
```

这证明的是 `¬(C∧S)`，和目标相反。

```text
Suppose ¬C. Therefore ¬S.
```

这是 inverse，不等价。

```text
Suppose C. Therefore ¬S.
```

这是证明目标的反面。

```text
Suppose C or S. contradiction.
```

这证明 `¬C∧¬S`，不是目标。

**常见坑：**

- `P→Q` 不需要证明 P 真。
- 只要 P 真时 Q 必真即可。

---

## 52. Proof Outlines for Statements with Multiple Quantifiers

**考点：** 证明带多重量词的命题、limsup 定义。

**典型题形：**

定义：

```text
lim sup a_q = a
```

iff：

```text
a is the smallest real number such that
∀epsilon>0, ∃K∈N, ∀m≥K, a_m < a+epsilon
```

**零基础理解：**

要证明某个 a 是 lim sup，要做两件事：

1. 证明 a 满足上界性质：

   ```text
   for every epsilon>0, eventually all terms are below a+epsilon
   ```

2. 证明 a 是最小的有这个性质的数：

   任何比 a 小的数都不满足这个性质。

**证明模板：**

```text
Let epsilon>0 be arbitrary.
Choose K=...
Then for all m≥K, ...
Thus a_m<a+epsilon.

Now suppose b<a.
Choose epsilon=...
Show that b does not satisfy the eventual upper bound property.
Therefore a is the smallest such number.
```

**常见坑：**

- `epsilon` 要任意，不是只选一个。
- K 可以依赖 epsilon。
- 最小性必须单独证明。

---

## 53. Eventually Even Proof

**考点：** 量词否定、floor 函数、构造反例。

**定义：**

```text
a_n is eventually even iff ∃N∈Z ∀n>N, a_n is even
```

**否定：**

```text
∀N∈Z ∃n>N such that a_n is odd
```

**零基础理解：**

“eventually even” 意思是过了某个位置之后全是偶数。

“not eventually even” 意思是：

无论你走到多后面，我都还能找到一个更后面的奇数项。

**做题步骤：**

1. 先写出正确否定。
2. 对任意 N，构造一个 n>N。
3. 证明这个 n 对应的 a_n 是奇数。

**floor 题技巧：**

如果表达式有：

```text
floor((22n+10)/5n)
```

类似形式，试着化简成：

```text
floor(4 + something)
```

然后选 n 的奇偶性或某个模数，让 floor 值固定。

**常见坑：**

- 否定 `eventually even` 不是“eventually odd”。
- 它只要求无限往后总能找到奇数，不要求后面全奇数。

---

## 54. Eventually Increasing Function Proof

**考点：** 量词否定、函数单调性、反例点。

**定义：**

```text
f eventually increasing iff
∃x∈R ∀y1∈R ∀y2∈R
[((y1>x)∧(y2>y1))→(f(y2)>f(y1))]
```

**否定：**

```text
∀x∈R ∃y1∈R ∃y2∈R
such that y1>x, y2>y1, and f(y2)≤f(y1)
```

**典型例子：**

```text
f(x)=3+5cos x
y1=x+pi
y2=y1+2pi
```

因为：

```text
cos(y2)=cos(y1+2pi)=cos(y1)
```

所以：

```text
f(y2)=f(y1)
```

没有严格变大。

**常见坑：**

- increasing 这里是严格 `>`。
- 找到相等就足够反驳严格递增。

---

## 55. Filling in the Blanks to Complete an Induction Proof

**考点：** 数学归纳法、整除证明、拆项。

**典型题形：**

证明：

```text
10 | 17^n - 7^n
```

或：

```text
-13 | 4^n - 17^n
```

**标准结构：**

1. Base case：

   对 positive integers，一般从：

   ```text
   n=1
   ```

   开始。

2. Inductive hypothesis：

   假设：

   ```text
   divisor | expression at n
   ```

3. Inductive step：

   证明：

   ```text
   divisor | expression at n+1
   ```

**拆项模板：**

要证明：

```text
a^(n+1)-b^(n+1)
```

写成：

```text
a*a^n - b*b^n
= a*a^n - a*b^n + a*b^n - b*b^n
= a(a^n-b^n)+b^n(a-b)
```

或者也可以用：

```text
= b(a^n-b^n)+a^n(a-b)
```

只要其中一部分能用 inductive hypothesis，另一部分明显被 divisor 整除。

**为什么不一定用因式分解捷径？**

题目问 induction proof，就必须展示归纳结构。

即使：

```text
a^(n+1)-b^(n+1)=(a-b)(...)
```

能直接证明整除，也不是在完成指定的 induction proof。

**常见坑：**

- base case 看题目是 natural numbers 还是 positive integers。
- induction hypothesis 只能假设 n 的情况，不能直接假设 n+1。

---

## 56. Identifying Valid Logical Expressions Associated with Mathematical Induction Arguments

**考点：** induction 形式是否足够覆盖所有整数。

**典型题形：**

给一些奇怪的 induction forms，例如：

```text
P(1), P(2)
for even n, P(n)∧P(n+2)→P(n+3)
for odd n, P(n)→P(n+1)
therefore all P(n)
```

问哪些 valid。

**零基础理解：**

判断 induction 是否 valid，本质是看能不能从 base cases 一步步推出所有 n。

**做题步骤：**

1. 把数字 1,2,3,4,... 写出来。
2. 看 base cases 已经有哪几个。
3. 用规则推：

   - odd n 规则：从 odd n 推 n+1。
   - even n 规则：从 even n 和 n+2 推 n+3。

4. 如果所有数字最终都能推出，就是 valid。
5. 如果某个数字永远推不出来，就是 invalid。

**part b 类型：**

如果给：

```text
P(n)∧P(n+2)∧...∧P(n+10) → P(n+13)∧P(n+26)
```

for even n。

要问 minimum base cases。

**思路：**

这个规则只从 even n 出发，前提涉及：

```text
n,n+2,n+4,n+6,n+8,n+10
```

推出：

```text
n+13, n+26
```

奇偶会发生变化：n+13 是 odd，n+26 是 even。

要保证所有 natural numbers 都能被覆盖，需要检查从哪些初始连续值开始，后续都能推出来。

这类题不要凭感觉，画 dependency graph 最稳。

**常见坑：**

- induction 不一定只允许 n→n+1，但必须覆盖所有目标。
- base cases 少一个可能导致某个 residue class 永远缺失。

---

## 57. University Subject Student Numbers

**考点：** 抽屉原理、反证法。

**典型题形：**

48 个学生选 5 个专业，证明至少一个条件成立：

```text
Accounting at least 4
Bioinformatics at least 8
Commerce at least 20
Digital Media at least 4
Engineering at least 16
```

**零基础理解：**

要证明“至少一个成立”，最常用反证：

假设全都不成立。

**做题步骤：**

如果全不成立，则：

```text
Accounting ≤ 3
Bioinformatics ≤ 7
Commerce ≤ 19
Digital Media ≤ 3
Engineering ≤ 15
```

总人数最多：

```text
3+7+19+3+15=47
```

但实际有 48 人，矛盾。

所以至少一个条件成立。

**常见坑：**

- “at least 4” 的否定是 “at most 3”。
- 要把所有上限相加。

---

## 58. Proofs About Cardinalities of Subsets of a Power Set

**考点：** 幂集大小归纳证明、pairwise non-disjoint family、配对补集。

**典型题形：**

1. 用归纳法证明 m 元集合有 `2^m` 个子集。
2. 若 `S` 大小 28，`T⊆P(S)`，且 T 中任意两个集合都不相交为假，即：

   ```text
   A∩B≠∅
   ```

   构造大小 `2^27` 的 T。
3. 证明不能超过 `2^27`。

**part a 归纳证明：**

Base：

```text
m=1
```

集合 `{1}` 有：

```text
∅, {1}
```

共 2 个，即 `2^1`。

Induction：

假设 m 元集合有 `2^m` 个子集。

对 m+1 元集合，取出一个元素 x。

子集分两类：

```text
不含 x：2^m 个
含 x：2^m 个
```

总：

```text
2^m+2^m=2^(m+1)
```

**part b 构造：**

固定某个元素 s，例如 1。

令：

```text
T={A⊆S : 1∈A}
```

任何两个集合都含 1，所以交集非空。

大小：

```text
2^27
```

因为剩下 27 个元素任意选。

**part c 不能更大：**

把每个子集 A 和它的补集 `S-A` 配成一对。

每一对中最多选一个进 T，因为：

```text
A∩(S-A)=∅
```

总共有：

```text
2^28 / 2 = 2^27
```

对，所以 T 最多 `2^27` 个。

**常见坑：**

- pairwise non-disjoint 是任意两个都要交，不是只和某一个交。
- 补集配对是这题的核心。

---

## 59. Critiquing and Applying a Proof Concerning Coprime Integers

**考点：** Bezout identity、整除、反证/有理根定理风格、无理性证明。

**典型题形：**

定理：

```text
gcd(s,p)=1 and s|p^3 ⇒ s=±1
```

然后用它证明某 cubic equation 的实根 irrational。

**零基础理解：**

如果 s 和 p 互素，但 s 还整除 p 的三次方，那么 s 不可能含任何非平凡质因子，所以只能是 ±1。

**proof blank 常见内容：**

由 gcd(s,p)=1，Bezout 给：

```text
sx+py=1
```

立方：

```text
s^3x^3+3s^2px^2y+3sp^2xy^2+p^3y^3=1
```

如果 `s|p^3`，写：

```text
p^3=ks
```

则左边每一项都有因子 s：

```text
s*z=1
```

所以 s 整除 1，于是：

```text
s=±1
```

**证明 cubic root irrational：**

假设 x rational：

```text
x=p/s
```

其中 p,s 整数且 gcd(p,s)=1，s≠0。

代入：

```text
(p/s)^3 + 4(p/s)^2 -7(p/s)+1=0
```

乘以 `s^3`：

```text
p^3 + 4p^2s -7ps^2 + s^3=0
```

整理可得：

```text
p^3 = s(-4p^2+7ps-s^2)
```

所以 `s|p^3`。

由定理，`s=±1`，所以 x 是整数。

再检查整数根：

如果 x 是整数且满足 cubic，那么可用 rational root theorem 或直接模数/估计证明没有整数根。

例如整数根必须整除常数项 1，所以只可能：

```text
x=1 或 x=-1
```

代入都不为 0。

矛盾，所以 x irrational。

**常见坑：**

- rational 要写成 lowest terms。
- 证明无理数常见路线：假设有理 → 最简分数 → 推出分母 ±1 → 整数 → 检查无整数根。

---

## 60. Critiquing Proof Ideas about Integer Solutions to a Linear Equation

**考点：** 找错误、星与棒、多项式系数、集合交差。

**典型题形：**

给草稿：

```text
x1+...+x6=12, xi even natural
m = number of solutions
n = coefficient of x^2 y^3 z in (x+y+z)^6
A={k∈N:m≤k≤5m}
B={k∈N:0<k<n^2}
```

让你判断每一行是否正确。

**零基础做法：**

逐行检查。

**Line 1：even natural solutions**

令：

```text
xi=2yi
```

则：

```text
y1+...+y6=6
```

如果 natural includes 0，则非负解数量：

```text
C(6+6-1,6-1)=C(11,5)
```

不是 `C(6,6)`。

如果课程 natural 从 1 开始，则 yi≥1，需要另算。看题目通常 non-negative 会明确；这里说 even natural number 要按课程定义。

**Line 2：coefficient**

`x^2 y^3 z` 总次数：

```text
2+3+1=6
```

系数：

```text
6!/(2!*3!*1!)
```

不是 `5!/(2!*3!)`。

**Line 3：A∩B 是否等于 A**

必须先算 m,n，再看 A 是否完全落在 B 中。

不能直接断言。

**Line 4：B-A**

也要根据正确 m,n 计算。

**常见坑：**

- 星与棒是 `C(total+variables-1, variables-1)`。
- 多项式系数用 multinomial：

  ```text
  6!/(2!3!1!)
  ```

- 集合交差要先明确端点。

---

## 61. Proof Outlines / Direct, Contrapositive, Contradiction Summary

**适用 title：**

- Selecting Valid Proof Set Ups for an Implication Statement
- Proof Outlines for Statements with Multiple Quantifiers
- Contrapositive Dropdown
- Critiquing proof questions

**速查：**

要证明：

```text
P→Q
```

合法路线：

```text
Direct: assume P, prove Q.
Contrapositive: assume ¬Q, prove ¬P.
Contradiction: assume P and ¬Q, derive contradiction.
```

不等价路线：

```text
assume Q, prove P        converse
assume ¬P, prove ¬Q      inverse
assume P, prove ¬Q       opposite of target
```

---

## 62. Quantifier Negation Summary

**适用 title：**

- Eventually Even Proof
- Eventually Increasing Function Proof
- Contrapositive Dropdown
- Proof Outlines with Multiple Quantifiers

**规则：**

```text
¬(∀x P(x)) ≡ ∃x ¬P(x)
¬(∃x P(x)) ≡ ∀x ¬P(x)
¬(P→Q) ≡ P∧¬Q
```

**例子：**

```text
¬[∃N ∀n>N, a_n even]
```

变成：

```text
∀N ∃n>N, a_n not even
```

如果 `a_n` 是整数：

```text
not even = odd
```

**常见坑：**

- 量词顺序不能乱。
- 否定 implication 时，不是 `¬P→¬Q`，而是 `P∧¬Q`。

---

## 第二批复习建议

如果你刚开始学逻辑证明，按这个顺序看：

1. Converting Statements to Symbolic Logic  
   先学英文怎么翻译。

2. Complete Truth Table  
   学会 `→` 和 `↔`。

3. Partial Truth Table  
   学会从候选中排除。

4. Applying the Rules of Logical Inference  
   学会 MP、MT、Elimination。

5. Identifying Logically Equivalent Statements  
   学会 if、only if、逆否。

6. Selecting Valid Proof Set Ups  
   学会证明 `P→Q` 的合法姿势。

7. Eventually Even / Eventually Increasing  
   学会多重量词否定。

8. Filling in the Blanks to Complete an Induction Proof  
   学会归纳法格式。

9. Proofs About Cardinalities of Subsets of a Power Set  
   学会一个完整证明题怎么写。

---

# 第三批：计数、排列组合、容斥、递推

这一批是题库里数量最多的一块。计数题最重要的不是背答案，而是先判断“对象是什么、能不能重复、有没有顺序、有没有限制”。

先记住四个基础工具：

```text
乘法原理：分步骤做，每步选择数相乘
排列 P(n,k)：从 n 个不同对象中按顺序选 k 个
组合 C(n,k)：从 n 个不同对象中不按顺序选 k 个
星与棒：非负整数解 x1+...+xr=N 有 C(N+r-1,r-1) 个
```

---

## 63. Counting Wordle Possibilities

**考点：** 字母位置限制、禁止字母、必须出现、重复限制、容斥。

**典型题形：**

Wordle 是 5 个字母，任意五字母串都允许。猜一次后给出：

- 某字母在单词里但不在某位置；
- 某字母在正确位置；
- 某些字母不在单词里；
- 可能再给重复条件。

**零基础理解：**

这类题不是英语单词题，是“长度为 5 的字符串计数”。

**通用做题步骤：**

1. 写出允许使用的字母集合。
2. 写出必须出现的字母。
3. 写出禁止出现的字母。
4. 写出位置限制，例如 `X` 不在第 1 位。
5. 判断是否允许重复。
6. 如果没有重复，用排列和位置选择。
7. 如果有重复，先处理重复字母出现几次，再安排位置。

**例题模板 1：一个字母必须出现但不在某位**

例如：

```text
X in word but not position 1
J,L,K,N not in word
```

可用字母数是：

```text
26-4=22
```

其中 X 是必须出现的，且不能在第 1 位。

计数法：

```text
所有用 22 个允许字母的字符串
- 没有 X 的字符串
- 第 1 位是 X 且其他位置任意允许的字符串中已经被多算/需排除的情况
```

更直接：

```text
X 至少出现一次，且第 1 位不是 X。
```

先让第 1 位不是 X：第 1 位有 21 种。
后 4 位用 22 个字母，但至少一个 X：

```text
21*(22^4-21^4)
```

**例题模板 2：恰好一个字母出现两次，无其他重复**

做法：

1. 分情况：重复字母是不是那个必须出现的字母。
2. 选重复字母。
3. 选它的两个位置。
4. 填剩余 3 个不同字母。
5. 加上 Wordle 的位置限制。

**例题模板 3：五个猜中字母都在单词中但都位置错误**

如果猜的是 5 个不同字母，且所有都在答案中，那么答案正好是这 5 个字母的排列。

要求每个字母不在原位置，就是 derangement：

```text
!5 = 44
```

也可用容斥：

```text
5! - C(5,1)4! + C(5,2)3! - C(5,3)2! + C(5,4)1! - C(5,5)0!
```

**常见坑：**

- “letter is in word but wrong place” 不代表只出现一次。
- “not in word” 的字母完全不能用。
- 有重复条件时，先处理重复，再填位置。

---

## 64. Counting Words on Planet Britz

**考点：** 字符串计数、分类字母、至少/恰好出现。

**题目结构：**

Britzian alphabet 有：

```text
15 sounds
4 gestures
12 thoughts
total 31 letters
```

问 14-letter words。

**基础：**

无任何限制：

```text
31^14
```

因为每个位置 31 种。

**恰好包含某一个指定 click sound、某一个指定 nod gesture、某一个指定 surprised thought 各一次：**

如果是指定的三个字母各出现一次：

1. 选它们的位置：

   ```text
   P(14,3) 或 C(14,1)C(13,1)C(12,1)
   ```

2. 剩下 11 位不能再用这三个字母：

   ```text
   28^11
   ```

总：

```text
P(14,3)*28^11
```

**至少出现某三个指定字母各一次：**

用容斥。

总 `31^14`。

至少包含 A,B,C：

```text
31^14
- C(3,1)*30^14
+ C(3,2)*29^14
- C(3,3)*28^14
```

**恰好 4 sounds、2 gestures、8 thoughts：**

先选哪些位置属于三类：

```text
C(14,4)*C(10,2)*C(8,8)
```

然后填字母：

```text
15^4 * 4^2 * 12^8
```

**常见坑：**

- “exactly one click sound” 如果 click 是某个指定 sound，就是固定字母；如果是任意 sound 类，要另乘选择种类。按题目英文判断。
- 类别数量和具体字母数量不要混。

---

## 65. Counting Words with Repeated Consonants and Subwords

**考点：** 重复字母、至少一个、容斥、连续子串、spread subword。

**题型：**

英文 26 字母，21 consonants，5 vowels。

问 19-letter words：

```text
R exactly 8 times
R exactly 8 and P exactly 8
at least one consonant exactly 8 times
include MAGPIE as subword
include MAGPIE as spread subword
```

**R exactly 8 times：**

选 R 的 8 个位置，其他 11 位不能是 R：

```text
C(19,8)*25^11
```

**R exactly 8 and P exactly 8：**

选 R 的位置，再选 P 的位置，剩下 3 位不能是 R/P：

```text
C(19,8)*C(11,8)*24^3
```

**至少一个 consonant exactly 8 times：**

用容斥。

令 `A_i` 表示第 i 个 consonant 出现 exactly 8 times。

单个：

```text
C(19,8)*25^11
```

两个指定 consonants 都 exactly 8：

```text
C(19,8)*C(11,8)*24^3
```

三个指定 consonants 都 exactly 8 不可能，因为 8*3>19。

所以：

```text
21*C(19,8)*25^11 - C(21,2)*C(19,8)*C(11,8)*24^3
```

**MAGPIE 连续 subword，无重复字母：**

把 `MAGPIE` 当成一个大块，长度 6。

总对象：

```text
1 个块 + 13 个其他字母 = 14 个对象
```

因为无重复，MAGPIE 用掉 6 个字母，剩下从 20 个字母中选 13 个并排列：

```text
14 * P(20,13)
```

也可理解为块的起点有 14 个位置，剩余 13 位排列。

**MAGPIE spread subword，无重复字母：**

先从 19 个位置中选 6 个放 M,A,G,P,I,E，顺序固定：

```text
C(19,6)
```

剩下 13 个位置从其他 20 个字母中排列：

```text
P(20,13)
```

总：

```text
C(19,6)*P(20,13)
```

**常见坑：**

- subword 通常连续；spread subword 不要求连续。
- 无重复时 MAGPIE 的字母不能再用。
- “at least one consonant exactly 8” 要排除两个 consonants 同时 exactly 8 的重复计数。

---

## 66. Rearrangements with Subwords

**考点：** 固定子串出现、exactly once、not at all、容斥/自动机思想。

**典型题形：**

```text
21-letter words contain "HALFTIME" twice/exactly once/not at all
```

**零基础理解：**

`HALFTIME` 长度为 8。把它当成一整块时，能简化连续出现的问题。

**出现两次：**

先考虑两个起点。

如果子串不能自我重叠，那么两个出现的区间不能重叠。

起点范围：

```text
1 到 14
```

选两个不重叠长度 8 区间，再填其他位置。

**exactly once：**

通常：

```text
出现至少一次 - 出现至少两次
```

但要注意两个出现是否可能重叠。

**not at all：**

```text
26^21 - 出现至少一次
```

如果精确计数复杂，常用容斥或递推/自动机。考试若给这种题，通常选的单词没有自重叠，方便按块处理。

**检查自重叠：**

看单词的真前缀是否等于真后缀。

`HALFTIME` 没有明显相同前后缀，所以一般不能重叠。

**常见坑：**

- 两个出现的起点不能随便选 `C(14,2)`，要排除重叠。
- exactly once 不是 at least once。

---

## 67. Distributing Lollies to Children with Varying Constraints

**考点：** 不同/相同物品分配、单射、满射、星与棒、组合选择。

**题型：**

给若干 children 和 lollies，然后和 answer key 对应。

**不同 lollies，无限制分给 children：**

每个 lolly 选一个孩子：

```text
children^lollies
```

例如 30 个不同糖给 37 个孩子：

```text
37^30
```

**不同 lollies，没人超过一个：**

把 30 个不同糖分给 37 个孩子，且每人最多一个。

等价于从 37 个孩子中按顺序选 30 个接收者：

```text
P(37,30)
```

**不同 lollies，至少一个孩子没拿到：**

总数减去每个孩子都至少一个的满射数。

也可直接用容斥数“至少一个空孩子”：

```text
C(37,1)*36^48 - C(37,2)*35^48 + C(37,3)*34^48 - ...
```

**相同 lollies 分给 children：**

非负整数解：

```text
x1+...+x37=48
```

数量：

```text
C(48+37-1,37-1)=C(84,36)
```

也等于 `C(84,48)`。

**相同 lollies 且每两人差最多 1：**

先做平均分。

例如 129 个糖给 37 个孩子：

```text
129 = 37*3 + 18
```

所以 18 个孩子拿 4 个，19 个孩子拿 3 个：

```text
C(37,18)
```

**每个孩子从 30 种糖中选 18 种不同糖，供应无限：**

每个孩子：

```text
C(30,18)
```

37 个孩子独立：

```text
C(30,18)^37
```

**常见坑：**

- 不同物品：通常用幂、排列。
- 相同物品：通常用星与棒。
- “每个孩子 receive 18 different types” 是每个孩子独立选组合。

---

## 68. Integer Solutions to Equations with Multiple Variables

**考点：** 星与棒、非负整数解、上限限制。

**典型题形：**

```text
x1+x2+...+x13=62
xi non-negative integers
```

**无其他限制：**

```text
C(62+13-1,13-1)=C(74,12)
```

**每个 xk ≡ 0 mod 5：**

如果每个都是 5 的倍数，那么左边总和也是 5 的倍数。

但：

```text
62 不被 5 整除
```

所以无解。

**每个 xk ≡ 0 or 3 mod 5：**

设有 r 个变量 congruent to 3 mod 5，其余 congruent to 0。

总和 mod 5 是：

```text
3r mod 5
```

要求：

```text
3r ≡ 62 ≡ 2 mod 5
```

因为 3 的逆元 mod 5 是 2，所以：

```text
r ≡ 4 mod 5
```

在 13 个变量中，r 可为：

```text
4,9
```

然后令：

```text
xi=5yi for type 0
xi=5yi+3 for type 3
```

对每个 r：

```text
sum yi = (62-3r)/5
```

变量有 13 个，所以解数：

```text
C(13,r)*C((62-3r)/5 + 13 - 1, 13 - 1)
```

对 r=4,9 相加。

**常见坑：**

- 先看 modulo 条件决定有几个变量属于哪类。
- 再做星与棒。

---

## 69. Counting Integer Solutions to a Linear Equation with Modular Congruence

**考点：** 星与棒 + 模条件。

这个 title 和上一题类似。

**通用模板：**

若：

```text
x1+...+xr=N
xi≡a or b mod m
```

做法：

1. 设有 j 个变量属于 residue a，r-j 个属于 residue b。
2. 用总和 modulo m 找 j 的可能值。
3. 对每个 j 写：

   ```text
   xi = m yi + residue
   ```

4. 剩余和做星与棒。
5. 乘以选哪些变量属于该 residue：

   ```text
   C(r,j)
   ```

**常见坑：**

- 每个变量非负时，替换后的 yi 也非负。
- 如果剩余和不是非负整数，该情况无贡献。

---

## 70. Counting the Numbers of Ways that Factories Can Produce Widgets with Varying Restrictions

**考点：** 非负整数解、偶数变量、至少限制、上限。

**题型：**

Factory A：

```text
a+b+c=5, a,b,c≥0
```

答案：

```text
C(5+3-1,3-1)=C(7,2)
```

Factory B：

```text
a,b,c even
d any
a+b+c+d=25
d≥3
```

设：

```text
a=2x, b=2y, c=2z, d'=d-3≥0
```

则：

```text
2x+2y+2z+d'=22
```

可以按 `x+y+z=t` 分类：

```text
d'=22-2t
```

要求 `t=0,...,11`。

对每个 t，`x+y+z=t` 有：

```text
C(t+2,2)
```

总：

```text
Σ_{t=0}^{11} C(t+2,2)
```

用 hockey-stick 可化成：

```text
C(14,3)
```

**每台机器最多 produce 6 items：**

若是：

```text
a+b+c+d=25, 每个≤6
```

则最大总数是：

```text
4*6=24
```

所以无解。

若题意是另一组变量，先用上限检查最大总和。

**常见坑：**

- 偶数变量要换成 `2x`。
- 至少 3 要换成 `d=d'+3`。
- 上限题先看是否总和超过最大可能。

---

## 71. Skill Point Distributions

**考点：** 星与棒、上限、最小最大值、容斥、多条件 skill checks。

**基础题：8 个 abilities，总共 55 点，每个最多 100。**

因为 55 小于 100，上限不影响：

```text
C(55+8-1,8-1)=C(62,7)
```

**总共 757 点，每个最多 100。**

设每个能力缺少的点数：

```text
yi = 100 - xi
```

总最大是：

```text
8*100=800
```

所以：

```text
y1+...+y8=43
```

答案：

```text
C(43+8-1,7)=C(50,7)
```

因为 yi≤100 不影响。

**Alchemy 最少为 a，其他最多 a+5，总和 134。**

设 Alchemy 为 a，其他 7 个在 `[a,a+5]`。

令其他：

```text
xi=a+yi, 0≤yi≤5
```

总和：

```text
a + 7a + Σyi = 134
8a + Σyi = 134
```

因为 `0≤Σyi≤35`：

```text
0≤134-8a≤35
```

解出 a 范围：

```text
99≤8a≤134
12.375≤a≤16.75
```

所以：

```text
a=13,14,15,16
```

最小 13，最大 16。

**skill checks：**

例如总 72 点，8 个变量。

条件：

```text
Alchemy≥18 or Buoyancy≥12
Charm≥20 or Diplomacy≥14
```

如果题目指定“pass second by Charm≥20”，则直接设：

```text
C'=C-20≥0
```

再处理 first check 的 or，用容斥：

```text
count(A≥18 or B≥12)
= count(A≥18)+count(B≥12)-count(A≥18 and B≥12)
```

每一项都用星与棒。

**常见坑：**

- 总点数小于单项上限时，上限可忽略。
- 条件有 “or” 时用容斥。
- “Alchemy has least” 要保证其他变量都 ≥a。

---

## 72. Digit Sums, Equality, and Divisibility

**考点：** 数位和、星与棒带上下限、容斥、抽屉原理。

**三位数 digit sum = s：**

设三位数为：

```text
abc
```

其中：

```text
1≤a≤9, 0≤b,c≤9
a+b+c=s
```

令：

```text
a'=a-1≥0
```

则：

```text
a'+b+c=s-1
```

并且：

```text
a'≤8, b≤9, c≤9
```

用容斥处理上限。

**digit sum divisible by 3 or 8：**

三位数共有 900 个。

可分别数：

```text
sum ≡0 mod 3
sum ≡0 mod 8
```

再减去：

```text
sum divisible by lcm(3,8)=24
```

因为最大 digit sum 是 27，所以 divisible by 24 只有 sum=24。

题目允许用 a 表示 sum=24 的答案，用 b 表示 sum=16 的答案，通常是为了简化。

**至少多少个数保证 15 个有相同 digit sum mod 8：**

有 8 个余数盒子。

要避免 15 个同盒，每盒最多 14 个：

```text
8*14=112
```

再多 1 个就保证：

```text
113
```

**常见坑：**

- 百位不能为 0。
- 抽屉原理中“保证 15 个”是 `(15-1)*盒子数 + 1`。

---

## 73. Counting Regular Numbers

**考点：** 指数计数、星与棒、等价类代表。

**题型：**

```text
5^a * 7^b * 13^c is 8-regular iff a+b+c=8
```

**a：多少个 8-regular numbers**

非负整数解：

```text
a+b+c=8
```

数量：

```text
C(8+3-1,3-1)=C(10,2)
```

**等价关系：**

```text
x∼y iff x=y*(2275)^n
```

其中：

```text
2275 = 5^2 * 7 * 13
```

所以指数变化是：

```text
(a,b,c) → (a+2n, b+n, c+n)
```

要选一组代表 S，使没有两个等价。

通常选不能再往下减 `(2,1,1)` 的点，即至少一个指数太小：

```text
a<2 or b<1 or c<1
```

如果题目选项用：

```text
a≤1 or b=0 or c=0
```

等价于：

```text
a<2 or b<1 or c<1
```

**计数 |S|：**

总数 `C(10,2)` 减去能往下减的：

```text
a≥2, b≥1, c≥1
```

令：

```text
a'=a-2, b'=b-1, c'=c-1
```

则：

```text
a'+b'+c'=8-4=4
```

数量：

```text
C(4+3-1,2)=C(6,2)
```

所以：

```text
|S|=C(10,2)-C(6,2)
```

**常见坑：**

- `2275` 要先分解质因数。
- 等价关系对应指数向量平移。

---

## 74. Invertibility, Squarefree Numbers, and Prime Scores with Modular Arithmetic

**考点：** 模逆元、互素、质因数限制、星与棒、squarefree。

**题型：**

```text
S={n∈N : n has inverse modulo 330}
```

**判断 n 有模 330 逆元：**

当且仅当：

```text
gcd(n,330)=1
```

因为：

```text
330=2*3*5*11
```

n 不能被 2,3,5,11 任一整除。

**T：prime divisor no greater than 21**

还要 n 的所有质因子都 ≤21，并且不能是 2,3,5,11。

可用质数：

```text
7,13,17,19
```

**squarefree elements of T：**

每个可用质数选或不选：

```text
2^4
```

如果 N 是否包含 1，一般 1 是 squarefree 且空乘积包括在内，所以包含 1。

**U：prime score 26**

prime score 是质因数个数，带重数。

所以 U 中元素形如：

```text
7^a 13^b 17^c 19^d
```

且：

```text
a+b+c+d=26
```

数量：

```text
C(26+4-1,4-1)=C(29,3)
```

**divisible by 10829：**

先分解 10829。如果它由可用 primes 构成，例如：

```text
10829 = 7^? 13^? 17^? 19^?
```

则给对应指数设下限，再星与棒。

如果含有 2,3,5,11 或 >21 的 prime，则答案 0。

**square numbers in U：**

square number 要所有指数都为偶数。

且：

```text
a+b+c+d=26
```

设：

```text
a=2a', b=2b', c=2c', d=2d'
```

则：

```text
a'+b'+c'+d'=13
```

数量：

```text
C(13+4-1,3)=C(16,3)
```

**常见坑：**

- 有逆元就是 gcd=1。
- prime score 带重数。
- squarefree 与 square number 是两回事。

---

## 75. Counting Palindromes and Board States in Mu Torere

**考点：** 回文、圆排列、Burnside 思想、棋盘对称。

**palindrome 长度 `2n-1`，有 `n-1` 个 A 和 n 个 B：**

回文由前 n 个位置决定。

因为长度奇数，中间位置决定奇偶。

回文中非中间位置成对出现，所以某个字母总数奇偶取决于中间字母。

这里 B 有 n 个，A 有 n-1 个。

- 如果 n 是 odd，则 B 数 odd，A 数 even，中间必须是 B。
- 如果 n 是 even，则 B 数 even，A 数 odd，中间必须是 A。

然后在前半部分选择需要的 A/B 数。

**圆排列 4 B, 3 A, 1 O：**

如果总是顺时针读，且 O 独一无二，可以固定 O 的位置破除旋转。

剩下 7 个位置放：

```text
4 B, 3 A
```

数量：

```text
C(7,3)
```

如果顺时针/逆时针都视为相同，还要除以 2，除非有反射对称的排列需要特别处理。

由于 O 固定后，反射会把 7 长串反过来，需要用 Burnside：

```text
(number clockwise arrangements + number fixed by reflection)/2
```

**Mu Torere game states：**

这类题本质是“环上字符串按旋转/反射等价”。

做题方法：

1. 固定中心和下一玩家。
2. 外圈 8 或 16 个位置看成 necklace/bracelet。
3. 根据胜利条件固定某些位置必须是 A/O。
4. 对称等价时用 Burnside 或固定空位 O 来简化。

**常见坑：**

- 圆排列有旋转等价。
- 如果允许反向读，还要考虑反射等价。
- 有唯一 O 时，常常可以把 O 固定作起点。

---

## 76. Poker Hands Counting Problems

**考点：** 扑克牌组合、条件抽牌、flush、straight、full house。

**基本原则：**

抽牌题默认不考虑抽到的顺序，问 hand 就用组合。

**flush exactly five cards in one suit：**

先看已有手牌中每个 suit 的张数。

要最终 exactly 5 in one suit：

1. 选目标 suit。
2. 确定还需要抽多少该 suit。
3. 其他抽牌不能让某 suit 超过或达到额外 flush 条件。
4. 从剩余牌堆中组合选择。

**straight including a given rank：**

列出所有包含该 rank 的 5 连 rank 组。

例如 rank 4 可出现在：

```text
A,2,3,4,5
2,3,4,5,6
3,4,5,6,7
4,5,6,7,8
```

然后对每个 rank set，计算可选 suits，排除已经不可用的牌。

**full house with already drawn three 4s and pair of 5s：**

已确定三张 4 都在 full house 中，还需要抽一对 5。

从剩余 deck 中：

1. 选 2 张 5；
2. 其他抽牌不能破坏？如果题目只要求 contain this full house，则其他牌任意。

**常见坑：**

- hand 不看顺序。
- “contain a full house” 与 “exactly a full house” 不同。
- A 在 straight 中可低可高，但不能同时连接 K 和 2。

---

## 77. Counting Functions / Relations Enumeration Quick Reference

**适用题：**

- Counting Functions Mapping Pirates to Islands
- Counting Functions Between Sets with Given Cardinalities
- Counting Relations with or without Particular Properties
- Counting Relations Given Particular Subsets

**函数：**

```text
all functions A→B: |B|^|A|
injective: P(|B|,|A|)
surjective: inclusion-exclusion
bijection: |A|! if same size
```

**关系：**

```text
all relations on n elements: 2^(n^2)
reflexive: 2^(n^2-n)
symmetric: 2^(n+C(n,2))
antisymmetric: 2^n*3^C(n,2)
equivalence relations: set partitions
```

---

## 78. Tiling a Grid of Arbitrary Length with Numbered Tiles

**考点：** 2×n tiling、递推关系。

**典型题形：**

有：

- 1×2 horizontal tiles，编号 1 到 h；
- 2×1 vertical tiles，编号 1 到 v；
- 不允许旋转。

求：

```text
a_n = number of tilings of 2×n grid
```

**零基础理解：**

看最左边一列怎么铺。

**情况 1：放一个 vertical tile**

它覆盖整列 `2×1`。

有 v 种选择，剩下 `2×(n-1)`：

```text
v*a_{n-1}
```

**情况 2：放两个 horizontal tiles**

因为 horizontal 是 `1×2`，要覆盖左上和左下，必须上下各放一块。

每块有 h 种编号：

```text
h^2
```

剩下 `2×(n-2)`：

```text
h^2*a_{n-2}
```

所以：

```text
a_n = v*a_{n-1}+h^2*a_{n-2}
```

如果题目写：

```text
a_{n+1}=C1*a_n+C2*a_{n-1}
```

则：

```text
C1=v
C2=h^2
```

**初值：**

```text
a_0=1
a_1=v
a_2=v^2+h^2
```

**常见坑：**

- horizontal tiles 要成对出现。
- 编号/颜色会乘选择数。
- `a_0=1` 表示空 tiling 一种。

---

## 79. Tiling a Grid of Fixed Length with Numbered Tiles

**考点：** 固定 2×10 grid、按 2×2 square tile 数量分类。

**典型题形：**

2×10 grid，用：

- 1×2 horizontal tiles，有 5 种编号；
- 2×2 square tiles，未编号；
- horizontal 不旋转；
- square 至多 3 个；
- square 不相邻。

**无 square 数限制：**

把 2×10 看成长度 10 的一维铺法：

- 一个 2×2 square 占宽度 2，有 1 种；
- 一对 horizontal tiles 占宽度 2，上下各一块，共 `5^2=25` 种。

注意这里没有 vertical 2×1，所以每次占 2 列。

如果只能用宽度 2 的模块，那么 10 列有 5 个 block，每个 block 26 种：

```text
26^5
```

**至多 3 个 square：**

在 5 个 width-2 block 中选 k 个放 square，其他放 horizontal pair：

```text
Σ_{k=0}^3 C(5,k)*25^(5-k)
```

**至多 3 个 square 且不相邻：**

在 5 个位置中选 k 个不相邻位置放 square：

```text
C(5-k+1,k)
```

所以：

```text
Σ_{k=0}^3 C(5-k+1,k)*25^(5-k)
```

**常见坑：**

- 2×2 square 占两列。
- 两个 horizontal tiles 组成一个 2×2 block，但有 25 种编号组合。

---

## 80. Arrangements of Coloured Straight and L-Shaped Tiles

**考点：** 两个递推序列、tiling states、消元得到二阶递推。

**题型：**

2×(3n) grid，用：

- straight 3×1 tiles，3 colors，可旋转；
- L-shaped trominoes，5 colors，可旋转；

定义：

```text
a_n = tilings of 2×(3n)
b_n = tilings of 2×(3n-1) with top-left corner removed
```

**零基础理解：**

这种题不能只看一列，因为 L 形会制造缺口。所以引入 `b_n` 表示“带一个缺口的状态”。

**做题套路：**

1. 先画最左边局部。
2. 分类第一块/前几块怎么铺。
3. 每种分类会把剩余部分变成：

   ```text
   a_{n-1}
   b_n
   b_{n-1}
   ```

4. 颜色数要乘上去。

**一般形式：**

题目会让你填：

```text
a_n = p*b_n + q*a_{n-1}
b_n = r*a_{n-1} + s*b_{n-1}
```

然后消去 b，得到：

```text
a_n = t*a_{n-1}+u*a_{n-2}
```

**闭式：**

若：

```text
a_n=t*a_{n-1}+u*a_{n-2}
```

特征方程：

```text
λ^2-tλ-u=0
```

根就是：

```text
k1,k2
```

**常见坑：**

- 颜色选择每放一块都要乘。
- L 形可旋转会增加形状情况。
- b_n 是辅助状态，不是随便定义的。

---

## 81. Setting Up Recurrence Relations by Tiling a Staircase Grid

**考点：** staircase tiling、二阶/三阶递推、子序列 gcd。

**题型：**

n-block staircase grid，用：

- vertical 1×2 tiles，有 7 种；
- horizontal 1×2 tiles，有 2 种；
- 不允许旋转，因为标签要正。

**零基础理解：**

阶梯形递推通常看最后一个 block 怎么铺。

可能出现：

1. 最后一个 block 自己独立铺；
2. 最后两个 block 之间有 horizontal tiles 跨接。

所以会有：

```text
a_n = p*a_{n-1}+q*a_{n-2}
```

**初值：**

```text
a_0=1
```

`a_1` 就是一个 2×2 block 的铺法：

- 两个 vertical：`7^2`
- 两个 horizontal：`2^2`

所以：

```text
a_1=7^2+2^2
```

**二阶递推：**

通常：

```text
p = a_1
```

独立最后 block 的铺法。

跨两个 block 的特殊铺法给 q，要根据图形结构数。

**三阶递推：**

可由二阶递推反复代入得到。例如：

```text
a_n=p*a_{n-1}+q*a_{n-2}
a_{n-1}=p*a_{n-2}+q*a_{n-3}
```

代入：

```text
a_n=(p^2+q)*a_{n-2}+p*q*a_{n-3}
```

所以：

```text
s=p^2+q
t=p*q
```

**常见坑：**

- staircase 的形状会影响跨块情况，不能完全套普通 2×n。
- 但初值和递推代入方法固定。

---

## 82. Recurrence Relations Based on AI Image Generation

**考点：** 乘法原理、逐层生成、递推。

**题型：**

颜色是 `(r,g,b)`，每个分量在：

```text
{0,1,...,78}
```

所以每个 pixel 有：

```text
79^3
```

种颜色。

**m×n 图片无约束：**

有 `mn` 个 pixels：

```text
p_{m,n}=(79^3)^(mn)=79^(3mn)
```

**从 k×k 扩展到 (k+1)×(k+1)：**

新增：

- 新底行 k 个；
- 新右列 k 个；
- 右下角 1 个；

总：

```text
2k+1
```

但题目对不同位置给不同选择数。

若每个 RGB 分量差值有 9 种，则颜色选择：

```text
9^3
```

若有 19 种：

```text
19^3
```

若有 11 种：

```text
11^3
```

所以：

```text
q_{k+1}=q_k*(9^3)^k*(19^3)^k*(11^3)
```

**常见坑：**

- `{0,...,78}` 有 79 个数，不是 78 个。
- RGB 三个分量独立，所以立方。
- 扩展一层新增 `2k+1` 个像素。

---

## 83. Recurrence Relations Based on Mosaic Tilings

**考点：** 分奇偶递推、逐层加边、颜色选择。

**题型：**

m×n mosaic，每个 tile 84 colors。

**无约束：**

```text
p_{m,n}=84^(mn)
```

**从 k×k 扩展：**

如果 k even，可以：

1. 加一行一列 1×1 tiles，变成 k+1。
2. 或加 2×2 tiles，变成 k+2。

如果 k odd，只能加 1×1 tiles，且每个新 tile 7 种颜色。

**新增 1×1 tiles 数：**

从 `(n-1)×(n-1)` 到 `n×n`，新增：

```text
n^2-(n-1)^2 = 2n-1
```

**新增 2×2 tiles 数：**

从 `(n-2)×(n-2)` 到 `n×n`，新增外圈厚度 2，要按 2×2 tile 覆盖数计算。

面积差：

```text
n^2-(n-2)^2=4n-4
```

每个 2×2 面积 4，所以需要：

```text
n-1
```

个 2×2 tiles。

每个 13 种颜色：

```text
13^(n-1)
```

**递推模板：**

如果 n odd，来自 n-1 even 加 1×1：

```text
q_n = 10^(2n-1)*q_{n-1}
```

如果 n even，可能来自：

- n-1 odd 加 1×1，每个 7 种；
- n-2 even 加 2×2，每个 13 种。

```text
q_n = 7^(2n-1)*q_{n-1} + 13^(n-1)*q_{n-2}
```

具体 10/7 要按题干 k even/k odd 的颜色数匹配。

**常见坑：**

- 新增一行一列不是 `2n`，是 `2n-1`，角落只算一次。
- 2×2 外圈数量用面积差除以 4。

---

## 84. Formulating and Solving a Recurrence Relation Based on Towers of Building Blocks

**考点：** 一维 tiling recurrence、特征方程、闭式解释。

**题型：**

height 1 blocks 有 9 colors，height 2 blocks 有 4 colors。

`a_n` 是高度 n 的 tower 数。

**递推：**

最后一块如果高度 1：

```text
9*a_{n-1}
```

最后一块如果高度 2：

```text
4*a_{n-2}
```

所以：

```text
a_n=9a_{n-1}+4a_{n-2}
```

初值：

```text
a_1=9
a_2=9^2+4=85
```

**特征方程：**

```text
λ^2=9λ+4
λ^2-9λ-4=0
```

根：

```text
(9±sqrt(97))/2
```

所以闭式：

```text
a_n=A*((9+sqrt(97))/2)^n+B*((9-sqrt(97))/2)^n
```

**为什么看起来有无理数但结果是整数？**

两个根是共轭无理数，A 和 B 也配对。无理部分会相互抵消，递推由整数初值和整数系数决定，所以每项一定是整数。

**mod 5 pattern：**

若要证明 `a_2,a_5,a_8,...` 被 5 整除，可以把递推 mod 5：

```text
a_n≡9a_{n-1}+4a_{n-2}≡4a_{n-1}+4a_{n-2} mod 5
```

计算周期，证明每隔 3 项为 0。

**常见坑：**

- tower 有顺序，上下顺序不同算不同。
- 最后一块分类是最自然递推。

---

## 85. Debt Repayment Recurrence Relations

**考点：** 一阶非齐次递推、等比稳定值。

**题型：**

借款 327000，年利率 -8%，每年再借 9000。

负利率 -8% 意味着每年乘：

```text
0.92 = 92/100 = 23/25
```

**初值：**

```text
a_0=327000
```

**递推：**

```text
a_n = (92/100)*a_{n-1}+9000
```

**a1：**

```text
a_1=0.92*327000+9000
```

**极限：**

若：

```text
L=0.92L+9000
```

则：

```text
0.08L=9000
L=112500
```

**变体：每年第 n 年借 `9000*(92/100)^n`**

递推：

```text
b_n = r*b_{n-1}+9000*r^n, r=92/100
```

由于非齐次项和齐次解同底 r，解会有 n 因子：

```text
b_n = r^n*(b_0+9000n)
```

**常见坑：**

- 负利率不是减 8 元，是乘 0.92。
- 稳定极限要解 fixed point。

---

## 86. Solving Initial Value Problem with Recursively Defined Function

**考点：** 二阶非齐次线性递推、特征方程、特解。

**典型题形：**

```text
f(n)-6f(n-1)+8f(n-2)=4^n
f(0)=-3, f(1)=-1
```

**步骤：**

1. 解齐次：

   ```text
   λ^2-6λ+8=0
   (λ-2)(λ-4)=0
   ```

   所以：

   ```text
   h_n=A*2^n+B*4^n
   ```

2. 找特解。

   右边是 `4^n`，但 `4^n` 已经在齐次解里，所以乘 n：

   ```text
   p_n=C*n*4^n
   ```

3. 代入递推求 C。
4. 总解：

   ```text
   f(n)=A*2^n+B*4^n+C*n*4^n
   ```

5. 用 `f(0),f(1)` 解 A,B。

**常见坑：**

- 如果右边底数是特征根，特解要乘 n。
- 如果是重根，要乘更高次 n。

---

## 87. Solving Non-Homogeneous Recurrence Relation with Initial Conditions

**考点：** 非齐次递推通用模板。

**通用方法：**

给：

```text
a_n + c1*a_{n-1}+c2*a_{n-2}= RHS
```

1. 先解齐次：

   ```text
   a_n + c1*a_{n-1}+c2*a_{n-2}=0
   ```

2. 写特征方程。
3. 根据 RHS 猜特解：

   - 常数：猜 C；
   - 多项式：猜同次数多项式；
   - `r^n`：猜 `C*r^n`；
   - `n*r^n`：猜 `(An+B)r^n`；
   - 如果撞特征根，乘 n。

4. 总解 = 齐次解 + 特解。
5. 代初值。

---

## 88. Characterising and Solving a Given Recurrence

**考点：** 递推阶数、线性、常系数、齐次/非齐次、特解形式。

**典型题形：**

```text
a_n + 15a_{n-1}+56a_{n-2}=5n(-6)^n
```

**判断性质：**

- order 2，因为涉及 `a_{n-2}`。
- linear，因为 a 项都是一次。
- constant coefficients，因为 15、56 是常数。
- nonhomogeneous，因为右边不是 0。

**associated homogeneous：**

```text
a_n+15a_{n-1}+56a_{n-2}=0
```

特征方程：

```text
r^2+15r+56=0
(r+7)(r+8)=0
```

所以：

```text
r=-7,-8
```

**初值问题：**

```text
a_n=A*(-7)^n+B*(-8)^n
```

用 `a_0=1,a_1=-10` 解 A,B。

**特解形式：**

右边：

```text
5n(-6)^n
```

是一次多项式乘 `(-6)^n`。

因为 -6 不是特征根，所以猜：

```text
(cn+d)(-6)^n
```

**常见坑：**

- RHS 有 n，所以不是 `c(-6)^n`。
- 如果 -6 是特征根才需要额外乘 n。

---

## 89. Solving Recurrence Relations Defined by Linear Difference Operators

**考点：** operator `T_k`、一阶递推、二阶递推因式分解。

**定义：**

```text
T_k((x_n)) = (y_n), y_n=x_{n+1}-k*x_n
```

**part a：**

```text
T_8(a_n)=(-14)
```

意思是：

```text
a_{n+1}-8a_n=-14
```

解一阶递推：

固定点 L：

```text
L-8L=-14
-7L=-14
L=2
```

所以：

```text
a_n=2+C*8^n
```

用 `a_0=7`：

```text
C=5
```

**part b：**

```text
T_62(T_85(c_n))=(0)
```

意思是先：

```text
y_n=c_{n+1}-85c_n
```

再：

```text
y_{n+1}-62y_n=0
```

所以：

```text
(E-62)(E-85)c=0
```

闭式：

```text
c_n=A*62^n+B*85^n
```

用 c0,c1 解 A,B。

**part c：非线性看似难，但可猜因式**

给：

```text
x_{n+2}-(8+n^7)x_{n+1}+8n^7x_n=0
```

这可能可因式成：

```text
(E-8)(E-n^7) 或构造某个简单解
```

提示说不要求一般求解，通常找一个明显解，比如：

```text
x_n=8^n
```

代入：

```text
8^{n+2}-(8+n^7)8^{n+1}+8n^7*8^n
=8^n[64-64-8n^7+8n^7]=0
```

所以：

```text
x_n=6*8^n
```

满足 x0=6 且 x1≠0。

**常见坑：**

- `T_k=0` 对应几何序列 `k^n`。
- operator composition 对应特征根。

---

## 90. Fibonacci Sequence Combinatorial Proof

**考点：** 1/2 组成和、Fibonacci、按 2 的数量分类。

**题型：**

`a_n` 是由 1 和 2 组成、总和 n 的序列数。

**递推解释：**

看序列最后一个数：

- 最后是 1：前面总和 n-1，有 `a_{n-1}` 种。
- 最后是 2：前面总和 n-2，有 `a_{n-2}` 种。

所以：

```text
a_n=a_{n-1}+a_{n-2}
```

初值和题目 Fibonacci 定义匹配，因此：

```text
a_n=F_n
```

**含 exactly k 个 2：**

如果有 k 个 2，总和贡献 2k。

剩下需要：

```text
n-2k
```

个 1。

总项数：

```text
k+(n-2k)=n-k
```

在 `n-k` 个位置中选 k 个放 2：

```text
C(n-k,k)
```

**k 最大：**

```text
floor(n/2)
```

所以：

```text
F_n = Σ_{k=0}^{floor(n/2)} C(n-k,k)
```

**常见坑：**

- k 是 2 的个数，不是序列长度。
- 剩余 1 的个数是 `n-2k`。

---

## 91. Counting Solutions to Linear Equations / Dots and Lines Summary

**适用题：**

- Integer Solutions to Equations with Multiple Variables
- Widgets
- Skill Points
- Digit Sums
- Regular Numbers
- Prime Scores

**无上限非负解：**

```text
x1+...+xr=N
answer C(N+r-1,r-1)
```

**每个 xi≥ai：**

令：

```text
yi=xi-ai
```

总和减去所有 ai。

**每个 xi≤M：**

用容斥：

```text
Σ_j (-1)^j C(r,j) C(N-j(M+1)+r-1,r-1)
```

只保留上面有意义的项。

**变量必须是偶数：**

令：

```text
xi=2yi
```

**变量满足模条件：**

令：

```text
xi=m*yi+residue
```

---

## 92. Battle Gauntlet Health Tracking

**考点：** gcd、线性组合、整数分拆、最后一步限制。

**part a：固定伤害 d，血量 H，打过头会加 R**

每次攻击本质上让血量按 modulo R 或某个周期变化。

要能正好到 0，通常要解：

```text
H - t*d ≡ 0 mod R
```

等价于：

```text
t*d ≡ H mod R
```

有解当且仅当：

```text
gcd(d,R) | H
```

**part b：两种武器伤害 51 和 36，血量 1815，打过头 reset**

因为 reset，最少回合就是找非负整数 x,y：

```text
51x+36y=1815
```

使：

```text
x+y
```

最小。

为了回合最少，尽量用伤害大的 51。

约束：

```text
51x ≡ 1815 mod 36
```

化简求最大 x。

**part c：battle plans，伤害 17,18,19，玩家 151 health**

计划是一个序列，直到总伤害首次 ≥151。

所以数所有由 17,18,19 组成的序列，使：

```text
前缀去掉最后一步的总伤害 <151
加上最后一步 ≥151
```

做法：

定义 `a_n` 为总伤害恰好 n 的序列数：

```text
a_n=a_{n-17}+a_{n-18}+a_{n-19}
```

然后答案：

```text
sum over s<151 of a_s * number of final hits d with s+d≥151
```

**常见坑：**

- part b 是最少攻击次数，优先大伤害但要满足整除组合。
- part c 是所有 battle plans，不是最短 plans。

---

## 93. Counting Palindromes / Circular Arrangements Summary

**回文：**

长度奇数 `2n-1` 由前 n 个字符决定。

如果字母数量中某个字母是奇数，它必须放中间。

**圆排列：**

有唯一特殊元素 O 时，可以固定 O，消除旋转。

如果反向也视为相同：

```text
用 Burnside 或检查反转固定点
```

**常见坑：**

- 普通排列除以 n 只适用于所有位置旋转无固定点且元素区别合适。
- 有重复字母时要除以重复阶乘。

---

## 94. Recurrence Relations Quick Reference

**一阶：**

```text
a_n=r*a_{n-1}+c
```

固定点：

```text
L=rL+c
```

解：

```text
a_n=L+(a_0-L)r^n
```

**二阶齐次：**

```text
a_n=A*a_{n-1}+B*a_{n-2}
```

特征方程：

```text
λ^2=Aλ+B
```

**非齐次：**

```text
general solution = homogeneous solution + particular solution
```

**特解猜法：**

```text
C                  for constant
An+B               for linear
C*r^n              for exponential
(An+B)r^n          for n*r^n
```

如果和齐次解撞车，乘 n。

---

## 第三批复习建议

如果你现在计数很弱，按这个顺序学：

1. Distributing Lollies  
   区分“相同”和“不同”物品。

2. Integer Solutions / Widgets / Skill Points  
   学星与棒和变量替换。

3. Counting Words / Wordle  
   学位置限制和容斥。

4. Digit Sums / Regular Numbers / Prime Scores  
   学把数字问题变成整数解。

5. Tiling a Grid of Arbitrary Length  
   学递推从“最后一步”分类。

6. Towers / Debt / Recurrence IVP  
   学特征方程和特解。

7. Fibonacci combinatorial proof  
   学怎么把计数题写成证明。

---

# 第四批：图论、平面图、最短路、最小生成树

图论题先记住几个“秒杀级”判断：

```text
度数和 = 2*边数
树：connected 且 edges = vertices - 1
Euler trail：连通且奇度顶点数为 0 或 2
Euler tour：连通且所有顶点度数都是偶数
二分图：没有奇环
连通平面图：V - E + F = 2
简单平面图且 V≥3：E≤3V-6
无 3-cycle 的简单平面图：E≤2V-4
Kruskal：按边权从小到大选，不成环就选
Dijkstra：从起点开始，每次确认当前最短距离点
```

---

## 95. Vertex Degree Sequence Graphs and Multigraphs

**考点：** 度数列、简单图、多重图、握手定理。

**典型题形：**

给序列：

```text
6,6,6,6,6,4,2
7,6,6,5,4,2,2
5,5,5,4,4,3
4,3,2,2,1,1
```

选择：

```text
multigraph 不存在
multigraph 存在但 simple graph 不存在
simple graph 存在
```

**零基础理解：**

图的度数是每个点连了多少条边。所有度数加起来一定是偶数，因为每条边贡献 2 个端点。

**多重图存在的基本条件：**

通常只要：

```text
度数和是偶数
```

且没有其他特殊限制，就可以构造 multigraph。因为允许平行边，甚至有时允许 loop，构造容易很多。

**简单图额外条件：**

如果有 n 个顶点，则每个度数必须：

```text
≤ n-1
```

因为不能自己连自己，也不能重复连同一个点。

但这只是必要条件，不一定充分。要用 Havel-Hakimi 检查。

**Havel-Hakimi 方法：**

1. 把度数从大到小排。
2. 取最大度 d，把它删掉。
3. 接下来 d 个最大数各减 1。
4. 重新排序。
5. 如果出现负数，失败；全变 0，成功。

**常见坑：**

- 度数和奇数：任何图/多重图都不可能。
- 有度数大于 `n-1`：simple graph 不可能，但 multigraph 可能。
- 度数都不超过 `n-1` 也不保证 simple graph 一定存在。

---

## 96. Completing a Vertex Degree Sequence with Different Conditions

**考点：** 给 `a,b` 补度数列，使多重图不存在 / 简单图存在 / 只有多重图存在。

**典型题形：**

```text
a,b,3,3,2,2,1,1,1
where a≥b≥3
```

找：

1. multigraph 不存在；
2. graph 存在；
3. multigraph 存在但 graph 不存在。

**做题步骤：**

1. 先算固定部分度数和。

   ```text
   3+3+2+2+1+1+1=13
   ```

   总和：

   ```text
   a+b+13
   ```

2. multigraph 不存在：让总和为奇数即可。

   也就是 `a+b+13` 奇数。

3. simple graph 不存在但 multigraph 存在：

   让总度数和为偶数，但某个度数超过 `n-1`。

   这里 n=9，所以 simple graph 度数最多 8。

   选 `a≥9` 且总和偶数。

4. simple graph 存在：

   选合理小的 a,b，用 Havel-Hakimi 验证。

**常见坑：**

- 这类题只要找“possible values”，不是所有值。
- 给一个满足条件的例子即可。

---

## 97. Vertex Degree Sequence Existence Proofs

**考点：** 证明某 degree sequence 不可能。

**典型题形：**

```text
8,6,3,3,3,2,1,1,1
```

证明没有 simple graph。

**方法 1：度数和奇偶**

先加总和。如果是奇数，直接不可能。

**方法 2：最大度矛盾**

有 9 个顶点，度数 8 的顶点必须和其他所有顶点相连。

如果某些顶点度数很小，扣除它们已经连到最大点后的剩余度数可能无法实现。

**Havel-Hakimi 证明：**

对序列执行 Havel-Hakimi，如果出现负数或矛盾，则无 simple graph。

**另一类题：32 个顶点，21 个度 31，4 个度 5。**

思路：

- 度 31 的顶点在 32 顶点 simple graph 中连向所有其他点。
- 所以任何顶点都至少连接这 21 个高阶顶点。
- 因此剩余 11 个顶点的度至少 21。
- 但题目说有 4 个顶点度为 5，矛盾。

**常见坑：**

- “度 31” 在 32 顶点图中表示 universal vertex，连所有人。
- 用这个强约束往往比 Havel-Hakimi 更快。

---

## 98. Planar Graph Degree Sequence

**考点：** 握手定理、Euler 公式、平面图区域数。

**典型题形：**

```text
simple connected planar graph degree sequence [1,3,1,1,3,3,3,3]
```

问：

```text
edges?
regions?
需要哪些性质？
```

**做题步骤：**

1. 边数：

   ```text
   E = 度数和 / 2
   ```

2. 顶点数：

   ```text
   V = 度数个数
   ```

3. 连通平面图 Euler 公式：

   ```text
   V - E + F = 2
   ```

   所以：

   ```text
   F = 2 - V + E
   ```

**计算 regions 需要什么性质？**

必须：

```text
planar
connected
```

simple 不是 Euler 公式必需条件。

**常见坑：**

- regions 包括外部无限区域。
- simple 不是求 F 的必要条件，但题目可能给它作为背景。

---

## 99. Identifying Trees and Counting Regions Using Vertex Degree Sequences

**考点：** 树、连通图、平面图区域。

**典型题形：**

给 connected graph 的 degree sequence，问：

```text
Is it a tree?
If planar, how many regions?
If impossible planar, enter 0.
```

**树的判断：**

连通图是树 iff：

```text
E=V-1
```

其中：

```text
E = 度数和/2
```

**平面区域：**

如果 planar：

```text
F=2-V+E
```

**判断不可能 planar：**

简单平面图常用：

```text
E≤3V-6
```

如果没有说明 simple，要小心。题目通常默认 graph 是 simple，multigraph 会特别说。

**常见坑：**

- connected + `E=V-1` 就是树。
- 树一定 planar，regions = 1。

---

## 100. Euler Tours and Numbers of Edges

**考点：** 完全图、删边使 Euler tour、dual graph Euler tour、平面图面度。

**part a：从 K52 删除最少边使有 Euler tour**

`K_n` 中每个顶点度：

```text
n-1
```

`K52` 每个顶点度是 51，全部是奇数。

Euler tour 需要所有顶点偶度。

删除一条边会让它的两个端点度数各减 1，因此会把两个奇度变偶度。

要把 52 个奇度顶点全变偶度，需要删除一组覆盖所有顶点且不重复端点的边，也就是 perfect matching。

最少边数：

```text
52/2=26
```

**part b：planar connected no 4-cycle, dual has Euler tour, prove E≤24**

关键知识：

- dual graph 有 Euler tour 表示 dual 中所有顶点度数为偶数。
- dual 的顶点对应原图 G 的 faces。
- dual 顶点度数等于原图对应 face 的边界长度。

所以 G 的每个 face 都有偶数长度。

又 G 没有 4-cycle，通常可推出没有长度 4 的 face。

简单平面图 face 长度至少 3；现在每个 face 偶数且不能是 4，因此每个 face 长度至少 6。

于是：

```text
2E = sum of face lengths ≥ 6F
```

所以：

```text
F≤E/3
```

Euler：

```text
V-E+F=2
```

给 `V=18`：

```text
18-E+F=2
F=E-16
```

结合：

```text
E-16 ≤ E/3
3E-48≤E
2E≤48
E≤24
```

**常见坑：**

- dual Euler tour 是关于 faces 的边界长度偶数。
- `2E=sum face degrees`。
- no 4-cycle 用来排除 4-sided face。

---

## 101. Complete Graph with Edge Removed

**考点：** `K_n` 删除一条边、Euler trail、Hamilton cycle、planarity。

**图 G = K_n 删除一条边。**

**度数：**

- 被删边的两个端点：度数 `n-2`。
- 其他 `n-2` 个顶点：度数 `n-1`。

**Euler trail：**

连通图有 Euler trail iff 奇度顶点数为 0 或 2。

分 n 奇偶：

- n 偶：`n-1` 奇，`n-2` 偶。于是其他 `n-2` 个顶点奇。奇度数 `n-2`。
- n 奇：`n-1` 偶，`n-2` 奇。于是被删边两个端点奇。奇度数 2。

所以 Euler trail 通常在 n 奇时有；还要 n=3 特殊也连通，是 path，有 Euler trail。

**Hamilton cycle：**

- n=3：K3 删除一边是 path，没有 Hamilton cycle。
- n≥4：有 Hamilton cycle，可以绕开被删除边。

**Planar：**

`K_5` 非平面，且 `K_5` 删除一边仍非平面。

所以：

```text
n=3,4 planar
n≥5 nonplanar
```

**常见坑：**

- 删除一条边只影响两个端点度数。
- `K5-e` 仍然非平面。

---

## 102. Grid Graph Properties

**考点：** 网格图、Euler、Hamilton、二分、平面。

**图 G(r,s)：**

顶点是 r×s 网格点，相邻格点有边。

**二分图：**

所有 grid graph 都 bipartite。

用颜色：

```text
(a,b) 的颜色由 a+b 的奇偶决定
```

相邻点会改变奇偶。

**Euler trail/tour：**

看度数。

在 r,s≥2 的 rectangular grid 中：

- 角点度数 2；
- 边界非角点度数 3；
- 内部点度数 4。

奇度顶点正是边界非角点：

```text
2(r-2)+2(s-2)=2r+2s-8
```

Euler tour 需要 0 个奇点：

```text
2r+2s-8=0 ⇒ r+s=4
```

且 r,s≥2，所以：

```text
r=s=2
```

Euler trail 需要 0 或 2 个奇点：

```text
2r+2s-8=0 or 2
```

第二个给 `r+s=5`，所以：

```text
(2,3) 或 (3,2)
```

加上 `(2,2)`。

**Hamilton circuit：**

grid graph bipartite。Hamilton circuit 必须在两色顶点数相等。

所以 `rs` 必须为偶数。

对于 rectangular grid `r,s≥2`，Hamilton circuit iff 至少一个 of r,s is even。

**G(7,9) 没 Hamilton circuit：**

顶点数：

```text
63
```

奇数。二分图中的 cycle 长度必须是偶数，所以不可能有覆盖 63 个点的 Hamilton circuit。

**最少加边使 G(2,4) nonplanar：**

图有 8 个顶点。简单非平面图至少要含 K5 subdivision 或 K3,3 subdivision。

这类题通常要用 planar 最大边数判断：8 顶点简单平面图最多：

```text
3V-6=18
```

G(2,4) 边数：

```text
horizontal: r*(s-1)=2*3=6
vertical: (r-1)*s=1*4=4
total 10
```

只靠超过边数上限至少要加 9 条，但可能更少能形成 K3,3。具体最小值需要看允许加哪些边；通常通过构造 K3,3 subdivision 证明上界，再用少于几条仍 planar 证明下界。

**常见坑：**

- grid graph 天然二分。
- Hamilton cycle 在二分图中要求两边颜色数量相等。

---

## 103. Base-m String Graphs

**考点：** Hamming graph、顶点边数、Euler tour、Hamilton cycle。

**定义：**

`G(m,n)` 顶点是所有长度 n 的 base-m string。
两个顶点相邻 iff 恰好一个 digit 不同。

这就是 Hamming graph。

**特殊图：**

```text
G(k,1) ≅ K_k
G(2,n) 是 n-dimensional hypercube Q_n
```

**顶点数：**

长度 n，每位 m 种：

```text
m^n
```

**每个顶点度数：**

选一个位置改：n 种；
改成其他 digit：m-1 种。

```text
degree = n(m-1)
```

**边数：**

```text
E = V*degree/2 = m^n*n(m-1)/2
```

**G(6,4)：**

```text
V=6^4
E=6^4*4*5/2
```

**Euler tour：**

图连通。Euler tour iff every degree even：

```text
n(m-1) even
```

**Hamilton cycle for G(3,n)：**

可以用 Gray code 思想。Hamming graph `G(m,n)` 对 m≥2,n≥2 通常有 Hamilton cycle；对 `G(3,n)` 可通过 induction 构造：

- 把 strings 按第一位 0,1,2 分成三层；
- 每层是 `G(3,n-1)`；
- 用 Hamilton paths/cycles 在三层之间连接。

证明题写清楚递归构造即可。

**常见坑：**

- 两个 string 相邻是只差一位，不是数值差 1。
- 度数不是 m*n，而是 n(m-1)。

---

## 104. Examining Different Types of Triangle Grid Graphs

**考点：** 三角网格、Euler/ Hamilton、区域数、路径计数。

**T_n 顶点：**

```text
V={(a,b)∈N×N : a+b≤n}
```

如果 N 含 0，顶点数是：

```text
C(n+2,2)
```

因为非负整数解 `a+b≤n`。

**边数：**

三类边：

```text
(a,b)-(a+1,b)
(a,b)-(a,b+1)
(a,b+1)-(a+1,b)
```

每类边数量通常都是：

```text
C(n+1,2)
```

所以总：

```text
E=3*C(n+1,2)
```

具体要按 N 是否从 0 开始确认。

**regions：**

连通平面图：

```text
F=2-V+E
```

**Euler/Hamilton 判断：**

看奇度顶点数量。三角网格中边界点度数不同，逐类数。

Hamilton path 通常存在，可以沿行扫描。

Hamilton cycle 通常受边界和小 n 限制。

**directed D_n paths：**

从 `(0,0)` 到 `(10,0)`，允许边方向：

- right；
- up；
- diagonal down-right from `(a,b+1)` to `(a+1,b)`。

若要求 exactly 9 horizontal edges：

到 x 坐标 10，需要总增加 a 十次。horizontal 和 diagonal 都增加 a。

如果 horizontal 9 次，则 diagonal 1 次。

为了回到 b=0，up 次数必须等于 diagonal 次数，所以 up 1 次。

总路径包含：

```text
9 H, 1 U, 1 D
```

还要保证不越界，通常排列中 U 必须在 D 前使 diagonal 可用。

**常见坑：**

- directed path 必须沿方向。
- path counting 先用位移方程确定每种步数。

---

## 105. Adjacency Matrix Multi-Select

**考点：** 从邻接矩阵判断图性质。

**邻接矩阵读法：**

对无向图：

- 矩阵应对称；
- 对角线非零表示 loop；
- 非对角线大于 1 表示 parallel edges；
- 只有 0/1 且对角线 0 表示 simple graph。

**判断 connected：**

可从矩阵对应的边做 BFS/DFS，看是否所有顶点可达。

**判断 tree：**

simple connected 且：

```text
E=V-1
```

或者 connected 且无 cycle。

**判断 Euler tour：**

connected 且所有度数偶数。

矩阵中度数：

- simple graph：一行和；
- multigraph loop 要贡献 2 到度数，具体看矩阵 loop 记法。

**判断 bipartite：**

看是否存在 odd cycle。矩阵不直接秒看，但可尝试二染色。

**判断 planar：**

小图可尝试画；也可用：

```text
E≤3V-6
```

作为必要条件。

**常见坑：**

- loop 破坏 simple graph，也让 graph 不是 bipartite。
- adjacency matrix 的 `M^k_{ij}` 是长度 k walks 数量。

---

## 106. Interpreting an Adjacency Matrix

**考点：** multigraph adjacency matrix、loops、parallel edges、walks。

**典型题形：**

给 4×4 矩阵，顶点 A,B,C,D。

问：

```text
哪些顶点有 loops？
有没有 parallel edges？
length 3 walks from D to D？
```

**loops：**

看对角线 entries。

如果：

```text
M_{ii}>0
```

则 vertex i 有 loop。

**parallel edges：**

看非对角线 entries。

如果：

```text
M_{ij}>1 for i≠j
```

则 i,j 之间有 parallel edges。

**walks length 3：**

矩阵幂：

```text
(M^3)_{DD}
```

就是从 D 到 D 的长度 3 walk 数量。

**常见坑：**

- path 和 walk 不同；walk 可以重复点和边。
- `M^2` 数长度 2 walks，`M^3` 数长度 3 walks。

---

## 107. Minimal Spanning Tree

**考点：** Kruskal 算法、最小生成树权重。

**Kruskal 步骤：**

1. 把所有边按权重从小到大排。
2. 从最小边开始选。
3. 如果选这条边会形成 cycle，就跳过。
4. 直到选了 `V-1` 条边。

**权重：**

把选中的边权加起来。

**第一条边有多少选择：**

看全图最小边权出现了几条。

**常见坑：**

- MST 连接所有顶点。
- Kruskal 不是从某个起点出发。
- MST 不一定唯一，但总权重相同。

---

## 108. Minimal Spanning Tree Multi-Select

**考点：** 从边列表选择 MST，并判断是否为 shortest path tree。

**做 MST：**

照 Kruskal 选边。

例如边列表有：

```text
BD weight 2
AD weight 2
DF weight 6
DC weight 6
AB weight 6
...
```

先选最小的 2 权边，再选 6 权边，只要不成环。

**判断它是不是从 G 到所有点的 shortest path tree：**

MST 和 shortest path tree 是不同概念。

要证明不是 shortest path tree，只需找一个顶点 v，使 MST 中 G 到 v 的路径长度大于原图中某条路径。

要证明是，则要逐个顶点检查 MST 路径长度等于 Dijkstra 最短距离。

**常见坑：**

- MST 最小化总边权。
- Shortest path tree 最小化从起点到每个点的路径距离。
- 一个树可以是 MST 但不是 shortest path tree。

---

## 109. Trees and Traffic Analysis

**考点：** MST weight、shortest path distance。

**题型：**

给 weighted graph，问：

```text
minimal spanning tree weight
shortest path distance from a to z
```

**做法：**

- MST：Kruskal 或 Prim。
- shortest path：Dijkstra。

**为什么不能混用：**

MST 的路径不一定是任意两点最短路径。

**常见坑：**

- MST weight 是选中所有树边的总和。
- shortest path distance 是一条路径的总和。

---

## 110. Dijkstra's Algorithm (Table)

**考点：** Dijkstra 表格、next edge、next vertex、total distance。

**步骤：**

1. 起点距离 0。
2. 其他顶点距离 infinity。
3. 每次选未确定顶点中距离最小者。
4. 记录它是通过哪条 edge 得到这个距离的。
5. 用它更新邻居。

**表格填法：**

每一行通常填：

```text
Next edge: 让新顶点获得最短距离的边
Next vertex: 新确定的顶点
Total distance: 起点到该顶点的距离
```

**常见坑：**

- Dijkstra 选的是“当前总距离最小的顶点”，不是最小边。
- 边权必须非负。

---

## 111. Dijkstra's Algorithm (Specify Edges)

**考点：** Dijkstra 过程边顺序。

**题型：**

问最短距离，还要写前 5 条 chosen edges。

**做法：**

每次确定一个新顶点时，记录它的 predecessor edge。

这条边就是 Dijkstra tree 中选择的边。

**注意 tie：**

如果有相同最短距离，可能有多个正确 Dijkstra 顺序。考试通常接受一种，或者图设计避免 tie。

**常见坑：**

- 不要写你“检查过”的边，要写让新顶点最终确定的 edge。

---

## 112. Dijkstra's Algorithm with Edge Weight Change

**考点：** shortest path 条件、修改某条边最大权重。

**题型：**

问 edge `{a,d}` 要出现在某条 shortest path from a to g 中，最大权重是多少。

**做题方法：**

设 `{a,d}` 权重为 x。

包含这条边的路径最短长度通常是：

```text
x + dist(d,g)
```

不包含这条边的最短路径长度是某个常数 L。

要让它出现在某条 shortest path 中，需要：

```text
x + dist(d,g) ≤ L
```

所以最大：

```text
x = L - dist(d,g)
```

**常见坑：**

- 只需要在“某条”最短路中，不需要所有最短路都包含它。
- 如果相等也可以，因为可能有多条 shortest paths。

---

## 113. Allocating Edge Weights Based on Spanning Tree and Shortest Path Conditions

**考点：** MST cut/cycle property、shortest path inequalities。

**题型：**

四点图 A,B,C,D，已知 AB、AC 权重，未知：

```text
BC=x, CD=y, BD=z
```

要求：

1. BC 不在任何 MST；
2. BC 在 C 到 D 的 shortest path 中。

**MST 条件：**

用 cycle property：

如果某条边是某个 cycle 中唯一最重边，则它不在任何 MST。

所以要让 BC 不在任何 MST，可以让它在三角形 ABC 中比 AB 和 AC 都重，且唯一最重。

例如：

```text
x > AB and x > AC
```

**shortest path 条件：**

BC 在 C 到 D 的 path 中，通常路径是：

```text
C-B-D
```

长度：

```text
x+z
```

要它是 shortest path，需要：

```text
x+z ≤ y
```

以及不超过其他 C 到 D 路径。

**计数 part b：**

若 y 固定，数 positive integer pairs `(x,z)` 满足：

```text
x > threshold
x+z ≤ y
```

用整数点计数。

**常见坑：**

- “not contained in any MST” 通常用唯一最重边 cycle property。
- “contained in a shortest path” 允许并列最短，所以用 `≤`。

---

## 114. Finding Graph Isomorphism / Isomorphic Graphs / Isomorphism Between Two Graphs

**考点：** 图同构、顶点映射、度数和邻接保持。

**零基础理解：**

两个图同构就是同一个结构，只是顶点名字不同。

映射 φ 要满足：

```text
uv 是 G 的边 iff φ(u)φ(v) 是 H 的边
```

**做题步骤：**

1. 列每个顶点度数。
2. 度数唯一的点先匹配。
3. 对同度数点，看它邻居的度数组合。
4. 试写映射。
5. 检查每条边是否被映到边。

**如果题目有图片但文字里只有 Maple plot：**

必须看到图才能给具体映射。没有图片只能给方法，不能可靠给最终表。

**常见坑：**

- 度数相同只是必要条件，不是充分。
- 同构映射要一一对应，不能两个顶点映到同一个点。

---

## 115. Graph: True or False / Multi-Select Graph Properties

**考点：** connected、bipartite、edge colouring、vertex colouring、planar、Hamilton、Euler。

**快速判断：**

Connected：

```text
所有顶点都在一个连通分量里
```

Bipartite：

```text
无奇环
```

Vertex 3-colourable：

```text
能否用 3 种颜色给顶点染色，使相邻不同色
```

Edge 3-colourable：

```text
能否用 3 种颜色给边染色，使同顶点相 incident 的边不同色
```

Euler trail not tour：

```text
连通且恰好 2 个奇度顶点
```

Hamilton cycle：

```text
找经过每个顶点一次的 cycle
```

Planar：

```text
能否画在平面无交叉
```

**常见坑：**

- Euler trail 和 Hamilton cycle 完全不同。
- Bipartite graph 不一定 planar，planar graph 不一定 bipartite。
- edge colouring 和 vertex colouring 不是一回事。

---

## 116. The Planarity of Regular and Dirac Graphs

**考点：** k-regular、planarity、握手定理、Dirac graph。

**k-regular：**

所有顶点度数都是 k。

边数：

```text
E = nk/2
```

所以 `nk` 必须是偶数。

**17 vertices 16-regular：**

这就是 `K17`。

`K17` 存在，但非平面，因为 `K5` 已经非平面，且边数远超 `3V-6`。

**29 vertices 5-regular：**

度数和：

```text
29*5=145
```

奇数，不可能。

**28 vertices 3-regular：**

度数和：

```text
84
```

可能。也存在 planar cubic graph，所以可以 both 3-regular and planar。

**Dirac graph：**

每个顶点度数至少 `n/2`。

要找最小 n 使所有 Dirac graphs nonplanar。

平面简单图：

```text
E≤3n-6
```

Dirac graph 最小边数：

```text
E ≥ n*(n/2)/2 = n^2/4
```

如果：

```text
n^2/4 > 3n-6
```

则必非平面。

解：

```text
n^2 -12n +24 >0
```

大约 n≥10 时成立。再检查 n=9 是否存在 planar Dirac graph。

**常见坑：**

- regular graph 存在先看度数和偶数。
- planar 用边数上限给“不可能”。

---

## 117. Planar Representations of Platonic Solids

**考点：** Platonic solids、Euler 公式、face/vertex incidence。

**五个 Platonic solids：**

```text
Tetrahedron: n=3, m=3
Cube: n=4, m=3
Octahedron: n=3, m=4
Dodecahedron: n=5, m=3
Icosahedron: n=3, m=5
```

其中：

- n = 每个 face 的边数；
- m = 每个 vertex 相交的 faces 数。

**关键关系：**

每条边属于两个面：

```text
nr=2e
```

每条边有两个端点，每个顶点有 m 条边相接：

```text
mv=2e
```

Euler：

```text
r+v=e+2
```

代入：

```text
r=2e/n
v=2e/m
```

所以：

```text
2e/n + 2e/m = e+2
```

两边除以 e：

```text
2/n + 2/m = 1 + 2/e
```

因此：

```text
1/e = 1/n + 1/m - 1/2
```

**dual：**

dual 会交换 faces 和 vertices，所以：

```text
(n,m) ↔ (m,n)
```

cube `(4,3)` 的 dual 是 octahedron `(3,4)`。

**常见坑：**

- cube 的 dual 不是 cube，是 octahedron。
- tetrahedron 自对偶。

---

## 118. Counting Edges and Vertices of Archimedean Solids

**考点：** 多面体面数、边数、顶点数、incidence counting。

**例：Truncated cuboctahedron**

faces：

```text
12 squares, 8 hexagons, 6 octagons
```

**边数：**

每个 face 边数相加，每条边被两个 faces 共享：

```text
2E = 12*4 + 8*6 + 6*8
E = (12*4+8*6+6*8)/2
```

**顶点数：**

vertex configuration 4.6.8 表示每个顶点有 3 个 faces 相遇。

face-vertex incidences 总数：

```text
12*4 + 8*6 + 6*8
```

每个顶点被 3 个 faces 计到：

```text
V = (12*4+8*6+6*8)/3
```

**给 V 和 configuration 5.6.6：**

每个顶点接 1 个 pentagon 和 2 个 hexagons。

如果 V=60：

pentagon vertex incidences：

```text
60
```

每个 pentagon 有 5 个顶点：

```text
number of pentagons = 60/5
```

hexagon incidences：

```text
2*60
```

每个 hexagon 有 6 个顶点：

```text
number of hexagons = 120/6
```

**常见坑：**

- 算 edges 除以 2。
- 算 vertices 除以每个顶点相遇的面数。

---

## 119. Examining Graphs Constructed Based on GCDs

**考点：** gcd graph、connected components、edges、bipartite、planar。

**定义：**

`G(a,b)` 顶点是整数 a 到 b。
两个不同顶点 i,j 相邻 iff：

```text
gcd(i,j)≠1
```

**做题步骤：**

1. 给每个数分解质因数。
2. 共享某个 prime factor 的两个顶点相连。
3. connected components：把共享质因数关系连起来。
4. edges：数所有 gcd>1 的 pairs。

**判断 bipartite：**

找 triangle。

如果有三个数两两不互素，例如：

```text
6,10,15
```

则它们两两 gcd>1，形成 triangle，非 bipartite。

**判断 planar：**

找 K5 或 K3,3 subdivision/minor，或者用边数上限。

`G(1,9)`、`G(1,10)` 这类题：

列出 2,3,4,5,... 的共享因子边，然后看是否能构成 K5/K3,3。

**常见坑：**

- 顶点 1 与任何其他数 gcd=1，所以通常孤立。
- prime number 只和它的倍数连边。

---

## 120. Proving Properties of a Relation Based on Walks of a Given Length

**考点：** graph walks、关系性质、奇偶。

**题型：**

定义在 hypercube 或 graph vertices 上：

```text
v R_k w iff exists a walk of length k from v to w
```

**symmetric：**

无向图中，如果有 v 到 w 的 walk 长度 k，反过来沿同样边走，就是 w 到 v 的 walk 长度 k。

所以 symmetric 对所有 k true。

**reflexive iff k even：**

在 bipartite graph 中，偶数长度 walk 从一个顶点回到同一 side；奇数长度到 opposite side。

要从 v 到 v，长度必须 even。

如果 k even，可以来回走一条边：

```text
v-u-v-u-...-v
```

得到长度 k 的 closed walk。

所以 reflexive iff k even。

**transitive：**

如果 v 到 w 有 length k，w 到 u 有 length k，拼起来是 length 2k，不是 length k。

所以一般不 transitive。

有些特殊 k/图可能 true，但通常不是 all k。

**常见坑：**

- walk 可以重复边和点。
- transitive 要同样长度 k，不是任意长度。

---

## 121. Proving an Equivalence Relation Exists Based on Walks of Even Length

**考点：** even length walks、odd cycle、equivalence classes。

**题型：**

在 odd cycle `C_{2k+1}` 上：

```text
v∼w iff exists a walk of even length from v to w
```

**证明 equivalence：**

Reflexive：

长度 0 walk 从 v 到 v，是 even。

Symmetric：

反向走同一条 even walk，仍 even。

Transitive：

even walk + even walk = even walk。

**等价类数量：**

在 odd cycle 中，任意两个顶点之间都有一条 path。若 path 长度是 odd，可以绕另一边走，长度为：

```text
(2k+1)-odd = even
```

所以任意两个顶点之间都有 even walk。

因此只有一个 equivalence class。

**常见坑：**

- 如果是 bipartite graph，even-walk equivalence classes 通常是两边颜色类。
- 但 odd cycle 让所有点都在同一类。

---

## 122. Graph Eccentricity

**考点：** shortest path lengths、eccentricity、diameter。

**定义：**

顶点 v 的 eccentricity：

```text
max distance from v to any other vertex
```

图的 diameter：

```text
max eccentricity over all vertices
```

**做题步骤：**

1. 从指定顶点做 BFS。
2. 写出到每个顶点的最短距离。
3. 最大值就是 eccentricity。
4. 对每个顶点重复，最大 eccentricity 是 diameter。

**证明 Dirac-like result：**

若简单图 H 有 n 个顶点且每个顶点：

```text
deg(v)≥n/2
```

证明 diameter≤2。

任取两个不同非相邻顶点 u,v。

u 有至少 n/2 个邻居，v 也有至少 n/2 个邻居。

这些邻居都在剩下 n-2 个顶点中。如果 u 和 v 没有共同邻居，则邻居总数至少 n，但最多 n-2，矛盾。

所以它们有共同邻居 w，于是：

```text
u-w-v
```

距离为 2。

若 u,v 相邻，距离 1。

因此 diameter≤2。

**常见坑：**

- eccentricity 用 shortest path 的最大值，不是任意路径。
- diameter 是全图最大 eccentricity。

---

## 123. Examining a Graph with an Incomplete Vertex Degree Sequence

**考点：** partial degree sequence、未知度数分配、multigraph edge arrangements。

**题型：**

Multigraph 有 10 vertices、35 edges，已知部分度数：

```text
14,12,11,10,8,8
```

问未知四个度数和，以及分配方式。

**part a：**

总度数：

```text
2E=70
```

已知和：

```text
14+12+11+10+8+8=63
```

未知和：

```text
70-63=7
```

**part b：**

四个未知顶点度数是非负整数：

```text
d1+d2+d3+d4=7
```

数量：

```text
C(7+4-1,4-1)=C(10,3)
```

如果要求每个顶点某些条件，要再调整。

**part c：未知顶点和 incident edges 能否形成 connected component？**

若这四个顶点形成单独 connected component，则它们的度数总和 7 必须等于该 component 内部边贡献的 2 倍，所以必须为偶数。

但 7 是奇数，不可能。

**part d：labelled edges，每条 incident with exactly one unknown vertex and one remaining vertex。**

每条这样的边选择：

```text
4 个未知顶点之一 * 6 个已知顶点之一 = 24
```

如果有 7 条 labelled edges：

```text
24^7
```

具体边数由未知度数和决定。

**常见坑：**

- 度数和永远偶数，但子集的度数和不一定偶数，除非没有跨出子集的边。
- labelled edges 可以重复选择同一对端点，因为 multigraph 允许平行边。

---

## 124. Shortest Travel Times and Food Delivery Routes

**考点：** Dijkstra、收益/时间比、往返路径。

**做题步骤：**

1. 用 Dijkstra 从 R 求到每个 destination 的最短时间。
2. 单程 hourly wage 比较：

   ```text
   pay / one-way time
   ```

   因为乘 60 对所有选项一样，可比较：

   ```text
   pay/time
   ```

3. 往返 hourly wage：

   如果无向图，返回时间等于去程最短时间。

   比较：

   ```text
   pay / (2*time)
   ```

   结果和单程相同。

   如果有向图或返回路径不同，则要另外算 destination 到 R。

**常见坑：**

- fixed price 不看距离，只看 destination pay。
- hourly wage 要除以时间，不是选 pay 最大。

---

## 125. Airline Timetable / Euler Route / Hamilton Route / Matrix Costs

**考点：** Euler trail、Hamilton path、TSP-like minimum route、矩阵读权重。

**part a：traverse each flight path exactly once**

这问 Euler trail。

判断：

```text
连通且奇度顶点数为 0 或 2
```

如果多于 2 个奇度顶点，则不可能。

**part b：minimal cost route starting at airport 1 visits each city exactly once**

这是 Hamilton path / traveling salesman path 变体。

如果只有 6 个城市，可以枚举从 airport 1 开始的所有顺序：

```text
5! = 120
```

计算总成本，取最小。

**part c：most expensive journey A to B with exactly one stop**

选一个中转 airport C：

```text
cost(A,C)+cost(C,B)
```

取最大，且 C 不是 A/B。

**常见坑：**

- Euler 是走每条边一次。
- Hamilton 是访问每个顶点一次。
- 权重矩阵中 `A_ij` 是 i 到 j 的 cost。

---

## 126. Planarity Add/Delete Edges

**考点：** planar/nonplanar、最少加边/删边。

**题型：**

给一个 planar 图 G，问最少加多少边使 nonplanar。
给 nonplanar 图 H，问最少删多少边使 planar。

**通用方法：**

1. 如果有具体图，先识别它离 `K5` 或 `K3,3` 还差几条边。
2. 加边题：最少加边让图含有 subdivision/minor of K5 或 K3,3。
3. 删边题：找到最少删边破坏所有 K5/K3,3 obstruction。

**边数上限辅助：**

简单平面图：

```text
E≤3V-6
```

如果加到超过这个上限，一定非平面。

但最少加边可能比这个少，因为出现 K5/K3,3 即可。

**常见坑：**

- 超过 `3V-6` 是充分非平面，不一定是最小加边。
- 没有图片无法精确作答。

---

## 127. Regular Graphs Quick Reference

**k-regular：**

```text
每个顶点度数都是 k
```

**存在必要条件：**

```text
nk even
0≤k≤n-1
```

对 simple graph，这两个条件通常也足以存在 k-regular graph，除了小边界需小心。

**2-regular graph：**

每个连通分量都是 cycle。

所以 9 个顶点的 2-regular graphs up to isomorphism 等于把 9 分拆成若干个 ≥3 的 cycle lengths：

```text
9
6+3
5+4
3+3+3
```

所以有 4 种。

**常见坑：**

- 2-regular 不一定是一个 9-cycle，也可以是多个 cycles。

---

## 第四批复习建议

如果你图论很弱，按这个顺序看：

1. Vertex Degree Sequence Graphs and Multigraphs  
   先掌握度数和、Havel-Hakimi。

2. Euler Tours and Numbers of Edges  
   学奇度顶点判断。

3. Planar Graph Degree Sequence  
   学 Euler 公式和区域数。

4. Grid Graph Properties / Base-m String Graphs  
   学特殊图的通用结构。

5. Minimal Spanning Tree  
   学 Kruskal。

6. Dijkstra's Algorithm  
   学最短路。

7. Adjacency Matrix  
   学矩阵读图。

8. Graph Isomorphism  
   学度数和邻居结构匹配。

---

# 第五批：数论、同余、RSA、GCD、应用题

数论题最核心的几个工具：

```text
a≡b mod m 表示 m | (a-b)
ax≡b mod m 有解 iff gcd(a,m) | b
若 gcd(a,m)=1，则 a 有模 m 逆元
模 m 有逆元 iff gcd(a,m)=1
gcd(a,b) 可用 Euclidean algorithm
lcm(a,b)=ab/gcd(a,b)
```

---

## 128. Finding and Counting Solutions to Congruences

**考点：** 线性同余方程、gcd、化简模数、原模数解集。

**典型题形：**

```text
54x≡96 (mod 183)
```

**零基础理解：**

同余方程：

```text
ax≡b mod m
```

就是：

```text
m | (ax-b)
```

**解题步骤：**

1. 计算：

   ```text
   g=gcd(a,m)
   ```

2. 检查：

   ```text
   g | b ?
   ```

   如果不整除，无解。

3. 如果整除，除以 g：

   ```text
   (a/g)x ≡ (b/g) mod (m/g)
   ```

4. 现在新系数和新模数互素，找逆元。

5. 得到最小模数下的解：

   ```text
   x≡r mod (m/g)
   ```

6. 如果题目要原模数 m 下的解集，列：

   ```text
   r, r+(m/g), r+2(m/g), ..., r+(g-1)(m/g)
   ```

**例子结构：**

```text
54x≡96 mod 183
gcd(54,183)=3
3|96
18x≡32 mod 61
```

然后求 18 的 mod 61 逆元。

**常见坑：**

- 除以 gcd 后，模数也要除。
- 原模数下会有 g 个解。

---

## 129. Solving Linear Congruences with Partial Information - Blackboard and Lecture Notes

**考点：** 从一个已知解推出完整解集、可能解数。

**题型：**

```text
80x≡? (mod 435) has solution x∈{420,???} mod 435
```

**零基础理解：**

对：

```text
ax≡b mod m
```

如果有解，解的数量是：

```text
gcd(a,m)
```

在原模数 m 下。

所有解彼此相差：

```text
m/g
```

其中：

```text
g=gcd(a,m)
```

**做题步骤：**

1. 计算：

   ```text
   g=gcd(80,435)
   ```

2. 步长：

   ```text
   step=435/g
   ```

3. 已知一个解 420，则完整解集：

   ```text
   420 + k*step mod 435, k=0,...,g-1
   ```

4. 整理成 0 到 434 的代表。

**part c：`30x≡? mod ?` 可能有几个解？**

解数如果存在，就是：

```text
gcd(30,m)
```

其中 m 是未知正整数。

所以可能的 n 是 30 的正因数：

```text
{1,2,3,5,6,10,15,30}
```

因为 gcd(30,m) 只能是 30 的因数，且每个因数都可通过选 m 实现。

**常见坑：**

- 解数不是 a，而是 gcd(a,m)。
- 完整解集步长是 `m/g`。

---

## 130. Counting Solutions to Linear Congruences

**考点：** 判断无解、唯一解、多解。

**典型题形：**

```text
ax≡10 mod 80
64≤a≤69
```

问哪些 a：

```text
no solution
exactly one solution mod 80
more than one solution
```

**核心定理：**

```text
ax≡b mod m
```

有解 iff：

```text
gcd(a,m)|b
```

如果有解，模 m 下解数是：

```text
gcd(a,m)
```

所以：

- no solution：`gcd(a,80)` 不整除 10；
- exactly one：`gcd(a,80)=1`；
- more than one：`gcd(a,80)>1` 且整除 10。

**做题步骤：**

对每个 a 算 gcd，然后分类。

**常见坑：**

- “unique solution modulo m” 要 gcd=1。
- gcd>1 但不整除 b 是无解，不是多解。

---

## 131. Interpreting Maple Output Regarding Modular Arithmetic and GCDs

**考点：** Extended Euclidean Algorithm、逆元、同余求解。

**典型题形：**

```text
51x≡3 mod 71
```

要求写 Euclidean algorithm lines，选择能乘的逆元。

**Euclidean algorithm：**

```text
71 = 1*51 + 20
51 = 2*20 + 11
20 = 1*11 + 9
11 = 1*9 + 2
9 = 4*2 + 1
2 = 2*1 + 0
```

然后反代得到：

```text
1 = s*51 + t*71
```

于是：

```text
s 是 51 mod 71 的逆元
```

解：

```text
x≡3*s mod 71
```

**选择题：可以乘哪些数？**

任何与 51 的逆元同余 mod 71 的数都可以。

如果逆元是 s，则：

```text
s, s±71, s±142, ...
```

都有效。

**常见坑：**

- 不是乘以 51，而是乘以 51 的逆元。
- 负数也可以，只要同余。

---

## 132. Money Owed and Solving Two Congruences Simultaneously

**考点：** 同时解两个线性同余、中国剩余思想。

**典型题形：**

```text
18x≡12 mod 30
28x≡12 mod 44
```

**先分别化简：**

第一条：

```text
gcd(18,30)=6
6|12
3x≡2 mod 5
```

3 的 mod 5 逆元是 2：

```text
x≡4 mod 5
```

第二条：

```text
gcd(28,44)=4
4|12
7x≡3 mod 11
```

7 的 mod 11 逆元是 8：

```text
x≡24≡2 mod 11
```

所以要解：

```text
x≡4 mod 5
x≡2 mod 11
```

试：

```text
x=4+5k
4+5k≡2 mod 11
5k≡-2≡9 mod 11
```

5 的逆元是 9：

```text
k≡81≡4 mod 11
```

所以：

```text
x=4+20=24 mod 55
```

**两个解 x,y 的最小正差：**

所有解相差：

```text
lcm(5,11)=55
```

所以最小正 `x-y` 是 55。

**常见坑：**

- 先化简每个线性同余，再合并。
- 合并后的模数是 lcm，如果两个模数互素就是乘积。

---

## 133. Three Variable Diophantine Equation

**考点：** 线性丢番图方程、参数解、代换。

**典型题形：**

```text
7c-12d=23
28x-12y+77z=23
```

**part b：解 `7c-12d=23`**

先找一个特解。

例如试：

```text
7*5 - 12*1 = 23
```

所以：

```text
c0=5, d0=1
```

通解：

```text
c = 5 + 12t
d = 1 + 7t
```

因为：

```text
7(c+12t)-12(d+7t)=7c-12d
```

**part c：把三变量式改写为 `7c-12d`**

```text
28x-12y+77z = 7(4x+11z)-12y
```

所以：

```text
c=4x+11z
d=y
```

**part d：解三变量**

由 part b：

```text
4x+11z = 5+12t
y = 1+7t
```

再解：

```text
4x+11z = 5+12t
```

找特解。模 4：

```text
11z≡5+12t≡1 mod 4
3z≡1 mod 4
z≡3 mod 4
```

令：

```text
z=3+4s
```

代回：

```text
4x+33+44s=5+12t
4x=-28+12t-44s
x=-7+3t-11s
```

所以：

```text
x=-7+3t-11s
y=1+7t
z=3+4s
```

**常见坑：**

- 参数 t,s 都是整数。
- 三变量方程会有两个自由参数。

---

## 134. Demonstrating Fermat's Last Theorem Using Modular Arithmetic

**考点：** 指数方程、模数限制、奇偶。

**题型：**

例如：

```text
3^a + 4^b = 5^c
```

分析正整数解。

**常用模思路：**

mod 3：

```text
3^a≡0
4^b≡1^b≡1
5^c≡(-1)^c
```

所以：

```text
1≡(-1)^c mod 3
```

推出 c even。

mod 4：

```text
4^b≡0
5^c≡1
3^a≡(-1)^a
```

所以：

```text
(-1)^a≡1 mod 4
```

推出 a even。

然后设：

```text
a=2r, c=2s
```

则：

```text
5^c-3^a = (5^s)^2-(3^r)^2
```

是 difference of squares。

**常见坑：**

- 模 3/4 是为了推出指数奇偶。
- difference of squares 后要利用左边是 2 的幂。

---

## 135. Battle Gauntlet Health Tracking

**考点：** gcd、同余、线性组合、递推计数。

这个题在第三批也从计数角度出现过，这里补数论视角。

**sleepy siren：**

血量 H，每次伤害 d，过头后加 R。

能否最终到 0 等价于是否存在 t：

```text
t*d≡H mod R
```

有解 iff：

```text
gcd(d,R)|H
```

所以判断每个武器时算：

```text
gcd(d,207) | 316 ?
```

**hale hob：**

伤害 51 和 36，要凑：

```text
51x+36y=1815
```

gcd：

```text
gcd(51,36)=3
```

3 整除 1815，所以有解。

最少攻击次数要最大化平均伤害，因此尽量多用 51，同时满足余数。

**常见坑：**

- 能打败不是看 d 是否整除 H，而是看 gcd 条件，因为过头会进入循环。
- 两武器组合是非负整数解问题。

---

## 136. Bike Gears and Chain

**考点：** gcd、周期、相对位置。

**题型：**

链条 L links，齿轮 T teeth。问哪些 gear minimal wear。

**核心结论：**

每个 link 都碰到每个 tooth iff：

```text
gcd(L,T)=1
```

**为什么：**

链条每转动一次，某个 tooth 接触的 link 编号按 mod L 前进 T 或按相对位移变化。只有 L 和 T 互素时，循环会遍历所有剩余类。

**做题步骤：**

对每个齿轮：

```text
gcd(chain links, teeth)
```

等于 1 就选。

**例：**

链条 68，齿轮：

```text
39,21,10
```

分别算 gcd。

**常见坑：**

- 不是看齿数是否整除链条，而是看 gcd 是否为 1。
- 若 gcd>1，只会接触部分组合，磨损不均。

---

## 137. Examining Musical Pitches using Modular Arithmetic

**考点：** 模 12、频率倍频、整除、最小 k。

**part a：同 pitch class 下一音**

同 pitch class 频率差一个 octave：

```text
f2=2*f1
```

如果给 1760 Hz，下一同类：

```text
3520 Hz
```

**part b：C 为 0 mod 12**

pitch classes：

```text
C=0
C#=1
D=2
D#=3
E=4
F=5
F#=6
G=7
G#=8
A=9
A#=10
B=11
```

所以 chord `(8,10,11)` 是：

```text
G#, A#, B
```

**part c：k pitch system 能精确包含 12 系统中的 chord**

12 系统中 pitch j 对应频率比例：

```text
2^(j/12)
```

k 系统中某 pitch t 对应：

```text
2^(t/k)
```

要相同：

```text
j/12 = t/k
```

所以：

```text
k*j divisible by 12
```

对 chord 中每个 j 都要成立。

最小 k>12 通常是让所有 `k*j/12` 为整数。

等价条件：

```text
12/gcd(12,j) | k
```

对多个 j 取 lcm，再找大于 12 的最小倍数。

**part d：pitch 3 mod 12 出现在 k system iff k multiple of 4**

要有 t：

```text
3/12 = t/k
```

即：

```text
1/4 = t/k
```

所以：

```text
k=4t
```

即 k 是 4 的倍数。

排除 k=12 是题目要求。

**常见坑：**

- 不是比较 pitch label，而是比较频率指数。
- `j/12=t/k` 是关键。

---

## 138. RSA Codebreaking

**考点：** RSA、模指数、私钥、逆元。

**RSA 基本流程：**

给两个 primes：

```text
p,q
```

模数：

```text
m=pq
```

Euler totient：

```text
N=(p-1)(q-1)
```

public key：

```text
α
```

要求：

```text
gcd(α,N)=1
```

private key：

```text
β≡α^{-1} mod N
```

也就是：

```text
αβ≡1 mod N
```

**加密：**

```text
y≡x^α mod m
```

**解密：**

```text
x≡y^β mod m
```

**做题步骤：**

1. 如果给 m 和一个 prime p，求：

   ```text
   q=m/p
   ```

2. 算：

   ```text
   N=(p-1)(q-1)
   ```

3. 用 extended Euclidean algorithm 求 α 的 mod N 逆元 β。
4. 解密每个数字：

   ```text
   y^β mod m
   ```

5. 用字母表数字转换成字母。

**常见坑：**

- RSA 的 N 不是模数 m，而是 `(p-1)(q-1)`。
- β 是 α 对 N 的逆元，不是对 m。

---

## 139. Cryptocurrency Wallets and RSA Decryption

**考点：** RSA 参数恢复、可能 public key、私钥、解密。

**题型：**

给：

```text
m=437
```

先分解：

```text
437 = 19*23
```

所以：

```text
N=(19-1)(23-1)=18*22=396
```

**public key α 条件：**

题目说 α 是 two digits and not prime，且：

```text
0<α<N
gcd(α,396)=1
```

列出 10 到 99 中非质数且与 396 互素的数。

因为：

```text
396=2^2*3^2*11
```

α 不能被 2、3、11 整除。

同时 α not prime。

**private key β：**

若 α=95，求：

```text
95β≡1 mod 396
```

用 Euclidean algorithm。

**解密：**

给 encrypted list `[13,38,295]`，算：

```text
13^β mod 437
38^β mod 437
295^β mod 437
```

然后用字母表：

```text
A=2, B=3, ..., Z=27
```

转换。

题目给 simplifications 是为了减少手算指数。

**常见坑：**

- public key 不 prime 不代表不能用，只要和 N coprime。
- 题目的字母映射从 A=2 开始，不是 A=1。

---

## 140. An Introduction to RSA Encryption

**考点：** lcm 版本 RSA、Fermat 小定理、中国剩余定理。

**题型：**

给 primes：

```text
p=60443, q=49957
```

定义：

```text
G=gcd(p-1,q-1)
L=lcm(p-1,q-1)
```

**lcm 公式：**

```text
L=(p-1)(q-1)/G
```

**选 e：**

要求：

```text
gcd(e,L)=1
```

所以存在 d：

```text
de≡1 mod L
```

等价于：

```text
de+kL=1
```

这是 Bezout identity。因为 gcd(e,L)=1，所以有整数解。

**证明解密正确：**

若：

```text
de≡1 mod L
```

则：

```text
de=1+tL
```

因为 `p-1|L`，所以：

```text
de=1+multiple of (p-1)
```

若 `m` 不被 p 整除，由 Fermat：

```text
m^(p-1)≡1 mod p
```

所以：

```text
m^(de)=m^(1+tL)=m*(m^(p-1))^something≡m mod p
```

同理：

```text
m^(de)≡m mod q
```

因为 p,q 互素，由 CRT：

```text
m^(de)≡m mod pq
```

**常见坑：**

- 这里用 lcm 而不是 totient，也可以，因为 p-1 和 q-1 都整除 L。
- 最后从 mod p 和 mod q 合并到 mod pq 要用 CRT。

---

## 141. Congruences and Square Moduli

**考点：** Hensel lifting 思想、平方同余、线性化。

**题型：**

已知：

```text
2029 prime
92^2≡348 mod 2029
```

求解：

```text
x^2≡348 mod 2029^2
```

设：

```text
x=92+2029t
```

**展开：**

```text
x^2 = 92^2 + 2*92*2029*t + 2029^2*t^2
```

mod `2029^2` 下最后一项为 0。

要求：

```text
92^2 + 184*2029*t ≡ 348 mod 2029^2
```

因为已知 `92^2-348` 被 2029 整除，设：

```text
92^2-348 = 2029*c
```

则：

```text
2029*c + 184*2029*t ≡ 0 mod 2029^2
```

除以 2029：

```text
184t ≡ -c mod 2029
```

所以：

```text
a=184
b=-c
```

**为什么有解：**

因为 2029 是 prime，且：

```text
gcd(184,2029)=1
```

所以 184 有逆元。

**推广到 every n：**

每一步从 mod `p^k` 的解提升到 mod `p^{k+1}`。

设：

```text
x_new = x + p^k t
```

展开后得到一个关于 t 的线性同余。

因为：

```text
2x not ≡0 mod p
```

可逆，所以每一步都能解。

**常见坑：**

- 展开后只保留到 `p^2` 或 `p^{k+1}`。
- 关键是导数 `2x` mod p 非零。

---

## 142. Modular Arithmetic, Greatest Common Divisors, and Inverses

**适用题：**

- Bike Gears and Chain
- Examining Musical Pitches
- Counting Solutions to Linear Congruences
- Invertibility modulo 330

**速查：**

```text
n has inverse mod m ⇔ gcd(n,m)=1
```

如果：

```text
m=330=2*3*5*11
```

那么 n 有逆元 iff n 不被 2、3、5、11 整除。

**判断选项：**

逐个算是否和 330 互素。

**常见坑：**

- 0 没有模 m 逆元。
- 与 m 有共同因子就没有逆元。

---

## 143. Linear Diophantine Equation Quick Reference

**方程：**

```text
ax+by=c
```

有整数解 iff：

```text
gcd(a,b)|c
```

如果一个特解是 `(x0,y0)`，令 `g=gcd(a,b)`，则通解：

```text
x=x0+(b/g)t
y=y0-(a/g)t
```

注意 b 的符号包含在公式里。

**例：**

```text
7c-12d=23
```

这里 a=7,b=-12,g=1。

如果特解 `(5,1)`：

```text
c=5-12t
d=1-7t
```

也可以改参数符号写成：

```text
c=5+12t
d=1+7t
```

两者都可以，因为 t 遍历所有整数。

---

## 144. Diophantine Equation, GCDs, and Coin-Change Style Problems

**适用题：**

- Battle Gauntlet
- Three Variable Diophantine Equation
- Money Owed

**非负整数解额外注意：**

丢番图通解给的是所有整数解。

如果题目要求次数、数量、攻击次数，通常要：

```text
x≥0, y≥0
```

再筛选参数范围。

**最小次数：**

如果两种伤害 d1>d2，要凑 H：

```text
d1*x+d2*y=H
```

次数：

```text
x+y
```

为了次数少，倾向最大化 x，但必须满足同余和 y≥0。

---

## 145. Critiquing and Applying a Proof Concerning Coprime Integers

**考点：** gcd=1、Bezout、整除、无理数证明。

这个题第二批已讲证明结构，这里补数论结论。

**核心定理：**

如果：

```text
gcd(s,p)=1 and s|p^3
```

则：

```text
s=±1
```

直觉：

p 和 s 没有共同质因子，p 的三次方也不会突然出现 s 的质因子。

**用法：**

证明某代数方程根无理时：

1. 假设 `x=p/s` 是最简分数。
2. 代入方程。
3. 推出 `s|p^3`。
4. 因为 gcd(s,p)=1，得 `s=±1`，所以 x 是整数。
5. 检查没有整数根，矛盾。

**常见坑：**

- 一定要说 p/s 是 lowest terms。
- `s=±1` 说明分数其实是整数。

---

## 146. Examining a Function from the Set of Multigraphs to the Set of Integers

**考点：** 函数单射/满射、图边数、完全二分图。

**题型：**

```text
f(G)=|V(G)|*|E(G)|
```

domain 可能是 all multigraphs 或 all connected graphs，codomain N。

**判断 injective：**

通常不是 injective。

因为很多不同图可以有同样的：

```text
|V|*|E|
```

例如两个非同构图都有 4 vertices, 3 edges，f 值一样。

**判断 surjective：**

若 multigraph 允许任意平行边，可以构造：

```text
|V|=1, |E|=n
```

如果 loop/edge allowed，可能得到任意 n。

但如果 connected simple graphs，`|E|` 和 `|V|` 有限制，未必能得到所有自然数。

**f(K_{m,n}) 是否 always even：**

完全二分图：

```text
|V|=m+n
|E|=mn
```

所以：

```text
f(K_{m,n})=(m+n)mn
```

要证明偶数：

- 如果 m 或 n 偶，则 mn 偶。
- 如果 m,n 都奇，则 m+n 偶。

所以乘积一定偶数。

**常见坑：**

- 不是判断图是否相同，而是函数输出是否相同。
- `K_{m,n}` 边数是 mn。

---

## 147. Examining a Function Defined by Modular Arithmetic and Divisibility

**考点：** 模函数、gcd、单射满射。

这类题和第 29/30 节相连。

**关键结论：**

对：

```text
f:X→X, f(x)=a*x mod m
X={0,1,...,m-1}
```

有：

```text
f injective ⇔ f surjective ⇔ gcd(a,m)=1
```

**证明 injective：**

如果：

```text
ax≡ay mod m
```

则：

```text
a(x-y)≡0 mod m
```

若 gcd(a,m)=1，可 cancel a：

```text
x≡y mod m
```

在 X 中代表唯一，所以 x=y。

**不 surjective：**

若 gcd(a,m)=d>1，则所有输出 `ax mod m` 都被 d 的结构限制，不可能覆盖所有 residue。

例如 0 和某些不可整除 residue。

---

## 148. Counting Solutions / Inverses Modulo 330

**考点：** 欧拉 φ、可用质因子、有限/无限集合语义。

题目定义：

```text
S={n∈N : n has inverse modulo 330}
```

如果 N 是所有自然数，则 S 是无限集合。但选择题只问某些数是否属于 S。

**判断：**

```text
gcd(n,330)=1
```

330 分解：

```text
2*3*5*11
```

所以 n 不能被这些 prime 整除。

**T 的 prime divisors ≤21 且在 S 中：**

允许 prime：

```text
7,13,17,19
```

所以 T 中数形如：

```text
7^a13^b17^c19^d
```

这就是后面 squarefree/prime score 计数的来源。

---

## 149. Number Theory Proof Checklist

做数论证明时，尽量按这个格式：

**整除证明：**

```text
To prove d|N, show N=d*k for some integer k.
```

**同余证明：**

```text
a≡b mod m iff m|(a-b).
```

**有逆元证明：**

```text
gcd(a,m)=1, so by Bezout there exist s,t with as+mt=1.
Thus as≡1 mod m.
```

**线性同余：**

```text
ax≡b mod m has solution iff gcd(a,m)|b.
```

**RSA/Fermat：**

```text
If p is prime and p∤m, then m^(p-1)≡1 mod p.
```

**CRT：**

```text
If p,q are coprime and N≡0 mod p and mod q, then N≡0 mod pq.
```

---

## 第五批复习建议

如果你数论几乎没学过，按这个顺序：

1. Finding and Counting Solutions to Congruences  
   先学 `ax≡b mod m`。

2. Interpreting Maple Output Regarding Modular Arithmetic and GCDs  
   学 Euclidean algorithm 和逆元。

3. Money Owed and Solving Two Congruences Simultaneously  
   学同时同余。

4. Three Variable Diophantine Equation  
   学整数方程通解。

5. Bike Gears and Chain  
   用 gcd 理解周期。

6. Examining Musical Pitches  
   用模和分数指数解决应用题。

7. RSA Codebreaking / Cryptocurrency Wallets  
   学 RSA 的 p,q,N,α,β。

8. Congruences and Square Moduli  
   这是进阶题，最后看。

---

# 总复习：看到题后怎么分类

如果题目里出现：

```text
∈,⊆,P(A),A×B
```

看第一批：集合。

如果出现：

```text
function, injective, surjective, bijective, composition
```

看第一批：函数。

如果出现：

```text
relation, reflexive, symmetric, antisymmetric, transitive
```

看第一批：关系。

如果出现：

```text
partial order, Hasse, minimal, maximal, lub, glb
```

看第一批：偏序。

如果出现：

```text
truth table, implication, contrapositive, proof outline
```

看第二批：逻辑。

如果出现：

```text
for all, exists, eventually
```

看第二批：量词。

如果出现：

```text
how many, arrangements, distribute, words, solutions
```

看第三批：计数。

如果出现：

```text
recurrence, a_n, initial condition
```

看第三批：递推。

如果出现：

```text
graph, degree, Euler, Hamilton, planar, tree
```

看第四批：图论。

如果出现：

```text
weighted graph, shortest path, minimal spanning tree
```

看第四批：Dijkstra / Kruskal。

如果出现：

```text
mod, congruent, gcd, inverse, RSA
```

看第五批：数论。

