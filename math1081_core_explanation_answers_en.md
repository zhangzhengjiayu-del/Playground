# MATH1081 Core Explanation Answers: Standard English Version

These are short standard English answers for the explanation/proof-style parts.

---

## Archimedean Archipelago (a)

The degree sequence `4,4,3,3,2` has total degree

`4+4+3+3+2 = 16`,

so the graph would have `16/2 = 8` edges.

However, the new graph `H` is formed by joining two connected graphs with a single bridge edge. Removing this bridge separates `H` into two connected components. If the two components have `k` and `5-k` vertices, then the maximum possible number of edges in `H` is

`C(k,2)+C(5-k,2)+1`.

For `k=1,2,3,4`, this maximum is at most `7`. Hence a graph of this form on 5 vertices cannot have 8 edges. Therefore `H` cannot have degree sequence `4,4,3,3,2`.

---

## Archimedean Archipelago (d)

The mayor's claim is not correct. Joining two planar connected graphs by a single bridge edge does not necessarily destroy planarity. We can draw the two planar graphs separately in the plane and then draw the new bridge edge between them without crossing any existing edge. Euler's formula is not violated, because adding an edge can also change the number of faces in the planar embedding. Therefore the resulting graph `H` can still be planar.

---

## Floor/Ceiling Proof

Suppose first that `x` is an integer. Let `a = 0.857x`. Since `0.857x + 0.143x = x`, we have

`0.143x = x - a`.

Because `x` is an integer,

`ceil(x-a) = x - floor(a)`.

Therefore

`floor(0.857x)+ceil(0.143x) = floor(a)+ceil(x-a) = floor(a)+x-floor(a)=x`.

Conversely, suppose that

`floor(0.857x)+ceil(0.143x)=x`.

The left-hand side is an integer, since both the floor and ceiling functions always return integers. Therefore `x` must be an integer. Hence

`x` is an integer if and only if `floor(0.857x)+ceil(0.143x)=x`.

---

## Hasse Diagram (e)

There is no set `C ⊆ Z+` whose Hasse diagram for `(C, |)` contains a cycle of length 3. In a Hasse diagram, an edge represents a cover relation: `a` is connected to `b` only if `a | b` and there is no element `c` in the set with `a | c | b` and `c` different from both `a` and `b`.

If three vertices formed a triangle, then among the comparable elements one relation would have to be implied through a third element. That would make one of the edges transitive rather than a cover relation. Such an edge would not appear in a Hasse diagram. Therefore a 3-cycle cannot occur.

---

## Pakamen (b)

The `(2,4)` entry of `M^2` being `2` means that there are exactly two length-2 directed paths from type `b` to type `d` in the bonus-damage relation. Equivalently, there are exactly two monster types `x` such that type `b` does bonus damage to type `x`, and type `x` does bonus damage to type `d`.

---

## Induction (b)

Oliver should not use Pranav's method because Pranav's argument is a direct factorisation proof, not a proof by mathematical induction. Although the factorisation may be correct, it does not follow the required induction structure of proving a base case and then proving the implication from `n` to `n+1`.

---

## Power Set Example (b)

One subset of `S` with cardinality 2 is

`{({},{}),({(2,2)},{})}`.

Both elements are ordered pairs whose first component is a subset of `{2,5}×{2,3,4}` and whose second component is a subset of `{3,5}×{1,3,5}`. The two ordered pairs are distinct, so the set has cardinality 2.

---

## Lollies (b)

First arrange all `nk` different lollies in a row. This can be done in `(nk)!` ways. Then divide the row into `n` consecutive blocks of size `k`, one block for each child. Since the order of the `k` lollies within each child's block does not matter, we divide by `k!` for each of the `n` children. Hence the number of distributions is

`(nk)!/(k!)^n`.

---

## Jury Duty (c)

From `s` and `s → ¬b`, by Modus Ponens we obtain `¬b`. From `h → b` and `¬b`, by Modus Tollens we obtain `¬h`. Finally, from `d ∨ h` and `¬h`, by elimination of the disjunction we obtain `d`. Therefore the conclusion that the criminal is dead is logically justified.

