# COMP1521 Week 1 Lecture 1 总结：Course Intro + MIPS Intro

> 来源：`COMP1521_26T2Week1_Lecture1_Course_Intro_and_MIPS_Intro.pdf`
>
> 这份总结按 tutor 讲课风格写：先讲“这门课到底想训练你什么”，再把 Week 1 的 MIPS 入门知识串成一条线。

## 1. 这门课到底在学什么？

COMP1511/COMP1911 主要训练你“怎么写程序”：给一个问题，设计算法，然后用 C 写出来。

COMP1521 则往下一层走：它关心的是“系统怎样运行一个程序”。换句话说，你不只是会写 `hello.c`，还要开始理解：

- C 程序在机器层面怎么执行；
- 程序、内存、CPU、汇编、机器码之间是什么关系；
- 数据在电脑里怎样表示，比如 integer、float、Unicode/emoji；
- Linux/Unix 里的文件、进程、线程和并发是什么；
- 为什么 C 里面的 pointer、malloc、stack overflow、segfault 不是玄学。

Tutor 可能会这样说：COMP1521 的目标不是让你“背汇编指令”，而是让你看到 C 程序底下那台机器在做什么。你越能想象内存和 CPU 的行为，debug C 的时候就越不容易靠猜。

## 2. 课程预期和学习方式

### 假设你已经会的 C

这门课默认你有 COMP1511/1911 的 C 基础，包括：

- 变量、赋值、表达式；
- `if`、`while`、`scanf`、`printf`；
- functions、return、prototypes；
- `.h` 和 `.c` 文件；
- arrays、structs、pointers；
- `malloc()` 和 `free()`。

### 不默认你已经会的

Week 1 会补/强化：

- recursion；
- bit operations；
- file operations。

Linked lists 不需要作为先修重点。

### 学习习惯

这门课会要求你更独立：

- 熟悉 Linux command line；
- 不要只依赖 autotest，要自己设计测试；
- 多用 `man` 查文档；
- 学会读错误信息和工具输出。

`man` 手册常用分区：

- section 1：shell commands，例如 `ls`、`cp`；
- section 2：system calls，后面会学；
- section 3：C library calls，例如 `getchar`、`scanf`。

例子：查 C 函数 `getchar`，用：

```bash
man 3 getchar
```

## 3. 课程工具

常见工具包括：

- CSE lab machines / VLAB / SSH；
- `dcc`，其他环境可能用 `clang` 或 `gcc`；
- `mipsy`、`mipsy_web`、VS Code MIPS extension；
- editor：VS Code、vim、nano 等；
- `make`、`man`、`bc -ql`、`python3`。

Tutor 提醒：这门课的“工具熟练度”本身就是学习内容。你会发现很多系统知识其实是在 terminal 里慢慢练出来的。

## 4. Assessment 和内容节奏

Lecture 里提到的主线：

- Assignment 1：Assembly / MIPS programming，主要对应 weeks 3-5；
- Assignment 2：C systems programming，主要对应 weeks 7-10；
- 后两周会简要介绍 processes、threads、concurrency。

进程、线程、并发属于更高阶也更有挑战的内容。想拿 DN/HD 需要认真掌握；只追求 pass 的同学也应该理解基本概念，但重点仍然是前面的 core content。

## 5. Academic Integrity 和 AI 工具

讲义强调不要：

- 分享自己的代码；
- 公开发布作业代码；
- 提交不是自己理解和完成的代码；
- 把生成式 AI 当作替你写作业的工具。

这门课允许学习、提问、理解概念，但作业代码必须是你能解释的。Tutor 常说的一句很实在：如果你不能在 lab 里当场解释某段代码为什么这样写，那它基本就不算你的能力。

## 6. 从 C 到“程序如何运行”

### 为什么不能直接运行 `./hello.c`？

`hello.c` 是源代码，给人看的。CPU 不能直接执行 C 语言。

平时我们会：

```bash
dcc -o hello hello.c
./hello
```

问题是：`hello` 这个文件里到底是什么？

答案：它是一个 executable program，里面包含 CPU 能执行的 instructions 和程序运行需要的数据，通常以 binary format 存储，也就是 0 和 1。

### 程序最初存在哪里？

程序文件一般存在 persistent storage，例如 HDD 或 SSD：

- 断电后数据还在；
- 比 RAM 慢；
- 用来长期保存文件。

### 真正执行时发生什么？

程序不能一直躺在 SSD 里等 CPU 读。执行前需要被加载进 RAM。

可以把 RAM 想成一个巨大的 1D array：

- 每个位置有地址；
- 地址像数组 index；
- RAM 比 SSD/HDD 快很多；
- RAM 是 volatile，断电数据会消失。

程序被 loader 放进内存后，CPU 才能从内存取 instruction 执行。

## 7. C 程序的内存布局

一个 C 程序运行时，内存大致分成几个区域：

### text/code segment

- 存机器码 instructions；
- 通常 read-only；
- 大小相对固定。

### data segment

- string literals；
- global variables；
- 有 read-only 和 writable 的部分；
- 大小相对固定。

### heap

- 动态分配内存；
- `malloc()` 时增长；
- `free()` 时释放；
- 生命周期由程序员管理。

### stack

- local variables；
- function parameters；
- function call/return 的信息；
- 函数调用时增长，函数返回时缩小；
- 自动管理。

Tutor 直觉讲法：stack 是“函数调用记录本”。每调用一个函数，就往上压一层；函数结束，就弹掉这一层。

## 8. Stack 和 recursion

讲义用 `main -> f -> g -> h` 的例子说明 stack frame 会随着函数调用层层叠加。

如果 recursion 没有 stopping condition：

```c
void f(int x) {
    printf("%d\n", x);
    f(x + 1);
}
```

每次 `f` 调自己，stack 都要再保存一份新的调用信息。无限递归最终会把 stack 用光，程序 crash。

Tutor 提醒：

- recursion 本身不是问题；
- 没有 base case 才是问题；
- stack overflow 不是“循环太久”，而是“函数调用层数太深，stack 空间撑不住”。

## 9. CPU 的基本循环：fetch, decode, execute

CPU 执行程序的核心过程：

1. fetch：从 memory 取下一条 instruction；
2. decode：理解这条 instruction 要做什么；
3. execute：执行它；
4. program counter 指向下一条 instruction。

讲义把它写成类似 C 的伪代码：

```c
int program_counter = START_ADDRESS;
while (1) {
    int instruction = memory[program_counter];
    program_counter++;
    execute(instruction, &program_counter);
}
```

注意：有些 instruction 会修改 `program_counter`。这就是 `if`、`while`、jump、branch 的底层基础。如果 CPU 永远只顺序执行下一条 instruction，就做不出条件判断和循环。

## 10. CPU instructions 能做什么？

常见 instruction 类型：

- computation：add、subtract、multiply、divide、bitwise operations；
- load/store：从 RAM 读数据到 CPU，或把数据写回 RAM；
- branch/jump：改变执行流；
- system calls：请求 operating system 做事，例如输入输出；
- 其他硬件相关操作。

重点直觉：CPU instruction 通常非常简单。高级语言里的复杂行为，是由大量简单 instruction 组合出来的。

## 11. Machine code vs Assembly code

CPU 真正执行的是 machine code，也就是 binary。

例如 assembly：

```mips
addi $t1, $t0, 12
```

可能被 assembler 翻译成类似：

```text
00100001000010010000000000001100
```

Assembly language 是人类可读的一层表示。一般来说，一条 assembly instruction 对应一条 CPU instruction。Assembler 负责把 assembly 转成 binary instruction。

## 12. C 编译到可执行文件的过程

平时我们用：

```bash
gcc -o hello hello.c
```

这看起来一步完成，但中间其实有阶段：

1. C source code；
2. compiler 生成 assembly code；
3. assembler 生成 machine code；
4. linker 等工具生成 executable binary；
5. 运行时 binary 被加载进 memory；
6. CPU 从 memory fetch instructions 开始执行。

可以用：

```bash
gcc -S hello.c
```

生成 `hello.s`，看看 compiler 产生的 assembly。

为什么要学 assembly？

- 理解 compiled program 怎样执行；
- 更好 debug；
- 以后理解 security vulnerability / binary exploitation 更有基础；
- 某些 performance 或 low-level 场景需要接近硬件；
- 写 compiler、driver 等系统软件时会遇到。

## 13. ISA：Instruction Set Architecture

ISA 定义了一种 CPU “听得懂”的 instruction 集合。

不同 CPU 可能使用不同 ISA：

- x86；
- ARM；
- RISC-V；
- MIPS。

可以把 ISA 想成 CPU 的语言。C 编译器要输出某个目标 ISA 的 assembly/machine code，CPU 才能执行。

## 14. 为什么 COMP1521 用 MIPS？

MIPS 的优点：

- 简单，适合教学；
- 仍然足够 powerful；
- 曾被用于游戏机、路由器、security cameras 等；
- 影响过很多后来的 ISA；
- 学会 MIPS 后，学 ARM、RISC-V 会更容易。

你的电脑大概率不是 MIPS CPU，所以不能直接运行 MIPS machine code。课程使用 `mipsy` 模拟 MIPS CPU 的行为。

运行方式包括：

```bash
1521 mipsy hello_COMP1521.s
```

也可以用 `mipsy_web` 或 VS Code extension。

## 15. MIPS CPU 里有什么？

讲义列出 MIPS CPU 组成：

- data registers；
- control registers；
- control unit；
- arithmetic-logic unit；
- floating-point unit；
- caches；
- connection to RAM。

Week 1 最重要的是 registers。

## 16. Registers 是什么？

Register 是 CPU 内部的小型高速存储位置。

关键点：

- CPU 大多数运算发生在 registers 之间；
- register 不在 RAM 里，而在 CPU 内部；
- register 数量很少；
- memory 里的值通常要先 load 到 register，CPU 才方便计算。

Tutor 类比：RAM 像书架，register 像你桌面上正在看的几张纸。你真正算题时，不会每一步都跑去书架翻书，而是先把要用的信息拿到桌上。

## 17. MIPS registers 入门

MIPS 有 32 个 general-purpose registers，每个 32-bit。

现在主要会用：

- `$t0` 到 `$t9`：临时计算；
- `$v0`：后面会用于返回值和 syscall；
- `$a0`：后面会用于参数和 syscall；
- `$zero` / `$0`：永远是 0，写入也不会改变；
- `$ra`：return address，程序结尾常配合 `jr $ra`。

## 18. 最简单的 MIPS 计算

想计算 `2 * 3`，MIPS 思路是：

1. 把 2 放入 register；
2. 把 3 放入 register；
3. 在 register 之间做乘法；
4. 结果放入另一个 register。

```mips
li  $t0, 2
li  $t1, 3
mul $t2, $t0, $t1
```

含义：

- `li` = load immediate，把一个立即数放进 register；
- `mul` = multiply，把 `$t0 * $t1` 的结果放进 `$t2`。

## 19. MIPS 最小程序模板

讲义给出的 bare-bones template：

```mips
main:
        # YOUR CODE GOES IN HERE
        li      $v0, 0
        jr      $ra
```

直觉：

- `main:` 是 label；
- 中间写你的 instructions；
- `li $v0, 0` 表示设置返回值为 0；
- `jr $ra` 表示跳回 return address，结束当前函数/程序。

## 20. 课堂练习：翻译成 register 运算

任务：

1. `$t0 = 10`
2. `$t1 = 7`
3. `$t2 = $t0 - $t1`
4. `$t2 = $t2 + 5`

MIPS 可能写成：

```mips
main:
        li      $t0, 10
        li      $t1, 7
        sub     $t2, $t0, $t1
        addi    $t2, $t2, 5

        li      $v0, 0
        jr      $ra
```

对应表达式：

```text
(10 - 7) + 5 = 8
```

Tutor 检查点：你应该在 mipsy 里看到 `$t2` 最后是 8。

## 21. Lecture 1 核心 takeaway

今天你应该带走三条线：

1. 程序不是神秘物，它是 instructions + data，存成 binary file。
2. 运行程序时，OS 把它加载进 RAM，CPU 通过 fetch-decode-execute 循环执行。
3. MIPS assembly 是我们观察机器行为的入门语言；register 是计算发生的主要地方。

## 22. Lecture 2 总览：MIPS Basics and Control

Week 1 Lecture 2 继续 MIPS，重点从“register 里做简单计算”推进到“程序怎样输入输出、怎样写分支和循环”。

这讲主要内容：

- hexadecimal 和 binary 的小复习；
- pseudo-instructions；
- system calls；
- `.text`、`.data`、`.asciiz`、label；
- assembly style；
- simplified C 和 `goto`；
- MIPS branch instructions；
- `if`、boolean expressions、loops 怎样翻译成 MIPS。

Tutor 式主线：Lecture 1 让你知道 MIPS 是什么；Lecture 2 开始让你写真正像程序的 MIPS：能 print、能 read、能 if、能 loop。

## 23. Hexadecimal 和 binary

在 C 和 mipsy 里，`0x` 表示 hexadecimal。

Hexadecimal 使用 16 个 digit：

```text
0 1 2 3 4 5 6 7 8 9 A B C D E F
```

对应 decimal：

```text
A = 10
B = 11
C = 12
D = 13
E = 14
F = 15
10_hex = 16_decimal
```

为什么系统课很喜欢 hex？

- address 经常用 hex 表示；
- machine instructions 和 binary data 用 hex 更容易读；
- 1 个 hex digit 刚好对应 4 bits；
- 8 个 hex digits 可以表示 32 bits。

例如：

```text
F_hex = 1111_binary
A_hex = 1010_binary
0x0000002A = 42_decimal
```

Tutor 提醒：hex 不是新数学，只是更适合看 bit pattern 的记号。后面学整数表示、bit operations、memory address 时会越来越常见。

## 24. Pseudo-instructions

Lecture 1 里我们写过：

```mips
li $t0, 5
```

Lecture 2 说明：MIPS assembly 里有些 instruction 是 pseudo-instruction。它不是 CPU 原生的一条真实 instruction，而是 assembler 给人类提供的方便写法。

例如：

```mips
li $t0, 5
```

可能会展开成：

```mips
addi $t0, $zero, 5
```

核心点：

- assembly 通常接近 1:1 对应 machine instructions；
- 但 pseudo-instruction 可能展开成 1 到 3 条真实 CPU instructions；
- 初学时可以用 pseudo-instructions，但要知道它们背后可能不止一条机器指令。

Tutor 提醒：`li` 很方便，先大胆用。等你后面关心 performance 或真正 instruction format 时，再回头看它展开成什么。

## 25. System calls：MIPS 怎么输入输出？

普通 program 的 CPU instructions 不能随便直接操作 hardware，例如屏幕、键盘、文件。原因是这些属于 privileged operations，应该由 operating system 控制。

所以程序要做输入输出时，需要请求 OS 帮忙。这个请求叫 system call。

mipsy 模拟了一个很小的 operating system，所以我们可以用 `syscall` 做简单 I/O。

System call workflow：

1. 在 `$v0` 里放 syscall number，告诉 OS 你想做什么；
2. 如果需要参数，把参数放到指定 register，常见是 `$a0`；
3. 执行 `syscall`；
4. 如果 syscall 有返回值，查看 syscall table，看返回值在哪个 register。

## 26. 打印 integer：print 42

要打印 integer 42：

```mips
li      $v0, 1      # syscall 1: print_int
li      $a0, 42     # argument: integer to print
syscall
```

理解：

- `$v0 = 1` 表示选择 `print_int`；
- `$a0 = 42` 是要打印的参数；
- `syscall` 把控制交给 mipsy 模拟的 OS；
- OS 检查请求合理后完成打印。

如果想打印 42 和 99，并换行，需要额外打印 newline character 或 string。后面你会经常看到 syscall 11 `print_char` 或 syscall 4 `print_string`。

## 27. 打印 string：`.data`、`.asciiz`、`la`

打印 string 比打印 integer 多一步：string 本身要放在 data segment 里，然后把 string 的 address 交给 syscall。

例子：

```mips
        .text
main:
        li      $v0, 4              # syscall 4: print_string
        la      $a0, hello_msg      # load address of string
        syscall                     # printf("Hello COMP1521!!\n");

        li      $v0, 0
        jr      $ra                 # return 0;

        .data
hello_msg:
        .asciiz "Hello COMP1521!!\n"
```

这里的新东西：

- `.text`：下面是 instructions/code；
- `.data`：下面是 global data；
- `hello_msg:`：label，代表一个 memory address；
- `.asciiz`：定义 nul-terminated string；
- `la` = load address，把 label 对应的地址放进 register。

`li` 和 `la` 的区别很重要：

```mips
li $t0, 7          # 把固定数值 7 放进 $t0
la $t0, my_label   # 把 my_label 的地址放进 $t0
```

Tutor 提醒：打印 string 时，`$a0` 里不是 string 本身，而是 string 在 memory 里的地址。

## 28. Assembly syntax 小结

MIPS assembly 里常见元素：

- labels：以 `:` 结尾，例如 `main:`、`loop_end:`，代表 memory address；
- comments：以 `#` 开始；
- directives：以 `.` 开始，例如 `.text`、`.data`、`.asciiz`；
- constants：类似 C 的 `#define`，例如 `MAX_NUMBERS = 10`、`QUIT = 'q'`；
- registers：有 symbolic names，也有 numeric names，例如 `$t0` 也叫 `$8`。

建议现在优先使用 symbolic names，例如 `$t0`，不要用 `$8`，可读性更好。

## 29. Simplified C：先把 C 变简单，再翻 MIPS

直接把复杂 C 翻成 MIPS 很难。所以课程推荐流程：

1. 先写正常 C；
2. 把 C 改写成 simplified C；
3. 确保 simplified C 仍然工作；
4. 再把 simplified C 的每一行翻成 MIPS。

Simplified C 的目标是让每一行更接近一条 MIPS instruction。

例如复杂表达式：

```c
printf("The average is %d\n", (a + b) / 2);
```

可以先拆成：

```c
int sum = a + b;
int avg = sum / 2;
printf("The average is %d\n", avg);
```

这样翻译时就有清晰步骤：

- load/read `a`；
- load/read `b`；
- add；
- divide；
- print。

Tutor 提醒：MIPS 作业最怕一边想 C 逻辑，一边想 register，一边想 syscall。先把 C 拆干净，MIPS 会简单很多。

## 30. Branch instructions：MIPS 怎样做 if？

到 Lecture 2 前，我们的 MIPS 程序基本是线性执行：

```text
instruction 1
instruction 2
instruction 3
...
```

但真实程序需要：

- conditionally execute code；
- loop over code。

MIPS 用 branch instructions 改变执行流。

常见形式：

```mips
ble $t0, $t1, label1   # if ($t0 <= $t1) goto label1
bgt $t0, 5, label1     # if ($t0 > 5) goto label1
blez $t0, label1       # if ($t0 <= 0) goto label1
b label1               # unconditional branch
```

核心直觉：

- branch 的本质是 “如果条件成立，就跳到 label”；
- label 代表某条 instruction 的地址；
- `b label` 是无条件跳转，相当于 simplified C 的 `goto label;`。

## 31. 为什么讲 `goto`？

C 里 `goto` 可以跳到任意 label：

```c
goto sleep;

sleep:
printf("You are getting sleepy\n");
goto sleep;
```

正常 C 编程中不推荐滥用 `goto`，因为：

- 可读性差；
- 程序结构容易乱；
- 编译器优化也可能更困难。

但在 COMP1521 里，我们会用 `goto` 作为中间步骤，帮助把 structured C control flow 翻译成 MIPS。

也就是说：

```text
normal C if/while/for
-> simplified C with goto + labels
-> MIPS branches + labels
```

Tutor 提醒：不要在普通 C 作业里乱用 `goto`。这里用它只是为了理解 assembly control flow。

## 32. 把 if 翻成 goto

原 C：

```c
if (n % 2 == 0) {
    printf("even\n");
}
```

先拆 temporary：

```c
int tmp = n % 2;
```

然后用 opposite condition 跳过 if body：

```c
int tmp = n % 2;
if (tmp != 0) goto if_even_end;
printf("even\n");
if_even_end:
```

为什么用 opposite condition？

因为如果条件不满足，就跳过 body；如果条件满足，就自然继续执行 body。

对应 MIPS 思路可能是：

```mips
        rem     $t0, $t1, 2
        bne     $t0, $zero, if_even_end
        # print "even\n"
if_even_end:
```

## 33. Assembly style

Lecture 2 强调 style：

- 写等价 C code 作为 inline comments；
- 推荐 8-wide tabs；
- 不要用 indentation 表示 if/loop nesting；
- labels 不缩进；
- instructions 缩进一层；
- comments 垂直对齐；
- 这门课优先 readable code，不优先追求最少 registers 或最少 lines。

推荐形状：

```mips
main:
        li      $t0, 0          # int i = 0;
loop_cond:
        bge     $t0, 10, loop_end
        # loop body
        addi    $t0, $t0, 1     # i++;
        b       loop_cond
loop_end:
        li      $v0, 0
        jr      $ra
```

Tutor 提醒：assembly 本来就低层，如果 style 再乱，debug 会非常痛苦。可读性就是生产力。

## 34. Boolean operators：`&&` 和 `||`

C 使用 short-circuit evaluation。

### `&&`

例如：

```c
if (x >= 0 && x <= 100) {
    // in bounds
} else {
    // out of bounds
}
```

如果第一部分已经 false，就不需要检查第二部分。

转换成 simplified C：

```c
if (x < 0) goto else_out_of_bounds;
if (x > 100) goto else_out_of_bounds;

// in bounds
goto if_bounds_end;

else_out_of_bounds:
// out of bounds

if_bounds_end:
```

思路：`&&` 需要所有条件都 true。任何一个失败，就跳到 else。

### `||`

例如：

```c
if (milk_age >= 30 || milk_level < 10) {
    // get new milk
} else {
    // drink milk
}
```

如果第一部分已经 true，就不需要检查第二部分。

转换：

```c
if (milk_age >= 30) goto if_need_new_milk;
if (milk_level < 10) goto if_need_new_milk;

// drink milk
goto if_milk_end;

if_need_new_milk:
// get new milk

if_milk_end:
```

思路：`||` 只要一个条件 true，就跳到 if body。

## 35. 复杂 boolean expression

例子：

```c
if (y < 10 || (z > 50 && w < 5)) {
    // condition met
} else {
    // condition not met
}
```

一种 simplified C：

```c
if (y < 10) goto if_cond;
if (z <= 50) goto else_not_cond;
if (w >= 5) goto else_not_cond;

if_cond:
// condition met
goto if_cond_end;

else_not_cond:
// condition not met

if_cond_end:
```

讲解：

- 如果 `y < 10`，整个 `||` 已经 true，直接进 if body；
- 否则必须检查 `(z > 50 && w < 5)`；
- 对 `&&`，只要 `z <= 50` 或 `w >= 5`，就失败进 else；
- 如果都没失败，就进入 condition met。

Tutor 提醒：复杂 boolean 不要硬翻。先画逻辑：什么时候能直接成功？什么时候能直接失败？

## 36. Loops：for -> while -> if/goto

课程推荐：

1. `for` loop 先改成 `while` loop；
2. `while` loop 再改成 `if/goto`；
3. 最后翻成 MIPS branches。

For loop：

```c
for (int i = 0; i < 10; i++) {
    printf("%d\n", i);
}
```

先改成 while：

```c
int i = 0;
while (i < 10) {
    printf("%d\n", i);
    i++;
}
```

再改成 label/goto 结构：

```c
int i;

loop_i_to_10__init:
    i = 0;

loop_i_to_10__cond:
    if (i >= 10) goto loop_i_to_10__end;

loop_i_to_10__body:
    printf("%d", i);
    putchar('\n');

loop_i_to_10__step:
    i++;
    goto loop_i_to_10__cond;

loop_i_to_10__end:
```

Loop 的结构可以固定记：

```text
init
cond: if exit condition goto end
body
step
goto cond
end
```

Tutor 提醒：MIPS loop 最常见 bug 是忘记 step，或者 branch condition 写反，导致 infinite loop 或一次都不跑。

## 37. Sum 100 squares 练习思路

题目：

```c
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i * i;
}
```

先改 while：

```c
int sum = 0;
int i = 1;
while (i <= 100) {
    int square = i * i;
    sum = sum + square;
    i++;
}
```

再改成 simplified C：

```c
int sum;
int i;
int square;

sum = 0;
i = 1;

loop_cond:
    if (i > 100) goto loop_end;
    square = i * i;
    sum = sum + square;
    i = i + 1;
    goto loop_cond;

loop_end:
```

MIPS register plan 可以先这样定：

```text
$t0 = sum
$t1 = i
$t2 = square
```

然后再逐行翻译：

```mips
        li      $t0, 0          # int sum = 0;
        li      $t1, 1          # int i = 1;

loop_cond:
        bgt     $t1, 100, loop_end
        mul     $t2, $t1, $t1   # square = i * i;
        add     $t0, $t0, $t2   # sum = sum + square;
        addi    $t1, $t1, 1     # i++;
        b       loop_cond

loop_end:
```

如果要 print `sum`，再加 syscall 1。

## 38. Lecture 2 核心 takeaway

这讲的核心是：MIPS 程序不只会算，还要会和 OS 交互、会控制执行流。

你应该掌握：

1. `syscall` workflow：`$v0` 选服务，`$a0` 放参数，`syscall` 执行；
2. `.text` 放 code，`.data` 放 global data；
3. `.asciiz` 定义 string，`la` 加载地址；
4. label 代表 address；
5. branch instruction 本质上就是 conditional goto；
6. `if` 用 opposite condition 跳过 body；
7. `&&` 是“任何失败就失败”，`||` 是“任何成功就成功”；
8. loop 固定结构是 init、cond、body、step、back branch、end。

## 39. Week 1 两讲之后怎么练？

建议练习顺序：

1. 用 terminal 编译并运行一个 C 文件；
2. 用 `gcc -S` 看它生成的 assembly；
3. 在 `mipsy_web` 手写简单 register 运算；
4. 练 `li`、`la`、`move`、`add`、`addi`、`sub`、`mul`、`rem`；
5. 练 syscall：print integer、print char、print string、read integer；
6. 把简单 `if` 改成 simplified C，再翻成 branch；
7. 把 `for` 改成 `while`，再改成 `goto`，最后翻 MIPS；
8. 每写一行 MIPS，都问自己：这行 instruction 读了哪些 register？写了哪个 register？会不会改变 program counter？

最后一句 tutor 风格提醒：MIPS 一开始看起来很啰嗦，是因为它把 C 帮你隐藏掉的机器动作摊开了。你不是在学“更难的 C”，你是在学 C 底下发生的事。

# COMP1521 Notes 详细总结：系统、数据表示、MIPS、进程线程、Unicode

> 来源：`bitwise_operations_notes.pdf`、`files_notes.pdf`、`floating_point_notes.pdf`、`integers_notes.pdf`、`mips_basics_notes.pdf`、`mips_control_notes.pdf`、`mips_data_notes.pdf`、`mips_functions_notes.pdf`、`processes_notes.pdf`、`threads_notes.pdf`、`unicode_notes.pdf`
>
> 顺序按你给的 PDF 列表整理。前面 lecture 总结是 Week 1 课堂导入；下面这部分更像专题 notes，覆盖 COMP1521 后面很多核心知识。

## 40. Bitwise Operations：从 byte 到 bit-level thinking

这一章一开头就在提醒：同一串 bytes 可以有很多解释。

例如：

```text
0b10100011
```

它可以被解释成：

- signed 1-byte integer：可能是 -93；
- unsigned 1-byte integer：163；
- 也可能只是某个更大数据的一部分。

再比如 4 bytes：

```text
01110011 01110010 01101001 00000000
```

可能是整数、浮点数，也可能是 null-terminated ASCII string `"sri"`。

Tutor 重点：bit pattern 本身没有意义。意义来自“你用什么类型/编码/协议解释它”。

### 40.1 C 的 6 个 bitwise operators

C 提供：

```c
x & y   // bitwise AND
x | y   // bitwise OR
x ^ y   // bitwise XOR
~x      // bitwise NOT
x << n  // left shift
x >> n  // right shift
```

这些和 `&&`、`||` 不一样。

- `&&`、`||` 是 logical operators，判断 true/false。
- `&`、`|`、`^` 是逐 bit 操作。

### 40.2 Bitwise AND：`&`

`&` 对每一对对应 bit 做 AND：

```text
00100111
& 11100011
---------
00100011
```

用途：

- 检查某一位是不是 1；
- 把某些位清零；
- 提取某段 bit。

判断奇数的底层思路：

```c
int is_odd(int n) {
    return n & 1;
}
```

因为奇数最低位一定是 1。

但 notes 也提醒：普通 C 代码里更推荐写清楚：

```c
int is_odd(int n) {
    return n % 2 != 0;
}
```

让 compiler 决定怎么优化。可读性优先。

### 40.3 Bitwise OR：`|`

`|` 对每一位做 OR：

```text
00100111
| 11100011
---------
11100111
```

用途：把某些 bit 设置成 1。

例如要把第 `n` 位设为 1：

```c
value = value | (1u << n);
```

### 40.4 Bitwise NOT：`~`

`~` 把每一位反过来：

```text
~00100111 = 11011000
```

常用于创建反 mask：

```c
value = value & ~(1u << n);
```

这表示把第 `n` 位清 0。

### 40.5 Bitwise XOR：`^`

XOR 的规则是：不同为 1，相同为 0。

用途：

- 翻转某些位；
- 找差异；
- 有时用于简单编码或状态切换。

翻转第 `n` 位：

```c
value = value ^ (1u << n);
```

### 40.6 Shifts：`<<` 和 `>>`

左移：

```c
x << n
```

大致相当于乘 `2^n`，但要小心 overflow 和 undefined behaviour。

右移：

```c
x >> n
```

对 unsigned 值通常相当于除 `2^n`。对 negative signed value，行为 implementation-defined 或容易踩坑。

MIPS 里也有 shift instructions：

- `sll`：shift left logical；
- `srl`：shift right logical，左边补 0；
- `sra`：shift right arithmetic，保留 sign bit，更适合 signed negative。

### 40.7 Mask：bitwise 的核心技巧

Mask 就是你做出来的一串 bit，用来筛选或修改目标值。

设置低 n 位为 1：

```c
uint32_t mask = 1;
mask = mask << n;
mask = mask - 1;
```

例如 `n = 4`：

```text
1 << 4 = 10000
10000 - 1 = 01111
```

提取 `[low_bit, high_bit]`：

```c
int mask_size = high_bit - low_bit + 1;
uint32_t mask = (1u << mask_size) - 1;
mask = mask << low_bit;
uint32_t extracted = value & mask;
extracted = extracted >> low_bit;
```

Tutor 讲法：先做一把“只露出你关心那几位”的尺子，然后 `&` 一下把其他位遮掉。

### 40.8 用 int 表示 set

如果 universe 比较小，可以用一个 integer 的 bits 表示集合。

比如第 `x` 位为 1 表示 `x` 在集合里。

```c
typedef uint64_t set;

set set_add(set a, int x) {
    return a | ((set)1 << x);
}

int set_contains(set a, int x) {
    return (a >> x) & 1;
}

set set_union(set a, set b) {
    return a | b;
}
```

这就是 bitset 思想。

### 40.9 Shift 常见 bug

要避免：

```c
i = i >> 1;      // 如果 i 是负数，行为不可靠/实现相关
i = i << 1;      // signed negative 左移可能 undefined
j = 1 << 33;     // 1 是 int，位数不够
```

更安全：

```c
uint64_t j = ((uint64_t)1) << 33;
```

Bitwise 很强，但也很容易写出“看起来能跑，其实不 portable”的 C。

### 40.10 考试常见题型：取出某一段 bits

Final 很喜欢考这种题：

```text
给一个 uint32_t x，返回 bit 12..19。
```

这种题不是靠猜，是固定套路：

```text
先右移，让目标 bits 来到最低位；
再 mask，只保留需要的那几位。
```

例如取 bit 12..19，一共 8 bits：

```c
uint32_t middle = (x >> 12) & 0xFF;
```

为什么是 `0xFF`？

```text
0xFF = 11111111
```

它刚好保留最低 8 位。

一般模板：

```c
// 取从 bit start 开始的 n bits
(x >> start) & ((1u << n) - 1)
```

但是注意：

```text
如果 n == 32，不要写 1u << 32，这是 undefined behaviour。
```

Tutor 提醒：遇到 bit extraction，先问两件事：

```text
目标最低位是几？我要右移几？
目标长度是多少？mask 是多少？
```

### 40.11 考试常见题型：最长连续 1

另一种 final 题型是：

```text
给 uint32_t x，返回 binary 里最长连续 1 的长度。
```

比如：

```text
0011110110
```

最长连续 1 是 4。

核心变量：

```text
current = 当前这一段连续 1 有多长
best    = 到目前为止见过最长连续 1 有多长
```

C 模板：

```c
int best = 0;
int current = 0;

for (int i = 0; i < 32; i++) {
    if ((x & 1) == 1) {
        current++;
        if (current > best) {
            best = current;
        }
    } else {
        current = 0;
    }
    x = x >> 1;
}

return best;
```

为什么看 `x & 1`？

```text
x & 1 只看最低位。
```

每次处理完最低位，就右移一位，让下一位来到最低位。

MIPS 版本也是同一个逻辑，只是变量放在 registers：

```text
$t0 = x
$t1 = i
$t2 = current
$t3 = best
$t4 = x & 1
```

关键指令：

```mips
andi    $t4, $t0, 1
srl     $t0, $t0, 1
```

这里要用 `srl`，因为我们处理的是 bit pattern。即使 input 是 `-1`，它的 bit pattern 是 `0xFFFFFFFF`，答案也应该是 32。

常见坑：

- 遇到 0 时忘记把 `current` 清零；
- 只在 loop 结束后更新 best，导致漏掉中间最长段；
- MIPS 用 `sra` 而不是 `srl`；
- 不固定循环 32 次，导致负数 bit pattern 处理混乱。

### 40.12 考试常见题型：count zero bits

22T2 final 还有一个很典型的 bitwise 题：

```text
给一个 32-bit unsigned integer，数一共有多少个 0 bits。
```

它和“数 1 bit”是同一种思路，只是判断条件反过来。

C 模板：

```c
int zeros = 0;

for (int i = 0; i < 32; i++) {
    if ((x & 1) == 0) {
        zeros++;
    }
    x = x >> 1;
}

return zeros;
```

MIPS 版本也是固定 32 轮：

```mips
        li      $t1, 0          # i
        li      $t2, 0          # zeros
loop:
        bge     $t1, 32, end
        andi    $t3, $t0, 1
        bne     $t3, 0, skip
        addi    $t2, $t2, 1
skip:
        srl     $t0, $t0, 1
        addi    $t1, $t1, 1
        b       loop
end:
```

Tutor 重点：很多 bitwise 题都是“固定循环 + 看最低位 + shift”。不要被题目文字吓到。

### 40.13 考试常见题型：reverse bytes，不是 reverse bits

22T2 final 还考过 byte order reversal：

```text
0x12345678 -> 0x78563412
```

注意这是反转 byte 顺序，不是反转 32 个 bit 的顺序。

把 32-bit value 拆成 4 个 bytes：

```c
uint32_t b0 = (x >> 0)  & 0xFF;
uint32_t b1 = (x >> 8)  & 0xFF;
uint32_t b2 = (x >> 16) & 0xFF;
uint32_t b3 = (x >> 24) & 0xFF;

return (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
```

这题和 endianness 很接近：你是在手动改 byte order。

常见坑：

- 写成 reverse bits；
- 忘记 `& 0xFF`，导致高位脏数据一起被移过去；
- shift 方向写反。

## 41. Files：文件、系统调用、stdio 和文件系统

这一章核心是：用户程序不能直接操作硬件，必须通过 operating system。

操作系统提供一个 virtual machine，让用户程序不用关心硬件细节：

- 程序不能直接访问所有 memory；
- 程序不能直接操作磁盘、键盘、屏幕；
- 程序通过 system call 请求 OS 帮忙。

### 41.1 System call 是什么

System call 做的事：

1. 用户程序准备参数；
2. 转到 OS privileged mode；
3. OS 检查操作是否合法；
4. OS 执行操作；
5. 返回用户程序。

Linux 有 400 多个 system calls。和文件有关的常见系统调用：

```text
read   读 bytes
write  写 bytes
open   打开文件，返回 file descriptor
close  关闭 file descriptor
stat   获取 metadata
lseek  改变当前读写位置
```

### 41.2 File descriptor

File descriptor 是一个小整数，代表进程打开的某个文件或 stream。

常见固定值：

```text
0 = stdin
1 = stdout
2 = stderr
```

底层写 stdout：

```c
write(1, bytes, 12);
```

意思是往 file descriptor 1 写 12 bytes。

### 41.3 `open`, `read`, `write`, `close`

打开文件：

```c
int fd = open(pathname, O_RDONLY);
```

读：

```c
ssize_t bytes_read = read(fd, buffer, count);
```

写：

```c
ssize_t bytes_written = write(fd, buffer, count);
```

关闭：

```c
close(fd);
```

每个 open file descriptor 有一个 current position。连续 `read` 会从上一次结束的位置继续。`lseek` 可以移动这个位置：

```c
lseek(fd, 42, SEEK_SET);
lseek(fd, -1, SEEK_END);
```

### 41.4 stdio：C library wrapper

平时常用的是 `stdio.h`：

```c
FILE *fopen(const char *pathname, const char *mode);
int fclose(FILE *stream);
int fgetc(FILE *stream);
int fputc(int c, FILE *stream);
char *fgets(char *s, int size, FILE *stream);
int fprintf(FILE *stream, const char *format, ...);
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
```

`FILE *` 是 stdio 层的抽象，内部通常包含 file descriptor 和 buffer。

便捷函数：

```c
getchar()  // fgetc(stdin)
putchar()  // fputc(c, stdout)
printf()   // fprintf(stdout, ...)
scanf()    // fscanf(stdin, ...)
```

### 41.5 Buffering

`fgetc` 看起来一次读 1 byte，但 stdio 内部可能一次向 OS 请求 4096 bytes，存在 buffer 里，然后之后的 `fgetc` 从 buffer 取。

这就是为什么 stdio 比直接每次 `read(fd, &c, 1)` 更高效。

但如果处理 binary data，不能随便用 string 函数，因为 binary data 可能包含 zero byte。

### 41.6 Path、directory、inode

Directory 本质上保存：

```text
name -> inode number
```

inode 保存 metadata：

- file type；
- owner；
- group；
- permissions；
- file size；
- block locations；
- timestamps。

`ls -i` 可以看 inode number。

Path 有绝对路径和相对路径。相对路径会根据 process 的 current working directory 解释。

### 41.7 Permissions

Linux 文件权限分三类用户：

- owner；
- group；
- other。

每类有三种权限：

- read；
- write；
- execute。

可以用 octal 表示：

```text
rwx = 111 = 7
rw- = 110 = 6
r-- = 100 = 4
```

例如：

```bash
chmod 700 f.txt
```

表示 owner 有 rwx，group 和 other 没权限。

### 41.8 stat、directory 操作和链接

`stat` 获取 metadata：

```c
struct stat s;
stat(pathname, &s);
```

`opendir/readdir/closedir` 可以遍历目录。

Hard link：多个名字指向同一个 inode。

Symbolic link：一个特殊文件，内容是另一个路径。

Tutor 提醒：文件系统不是“文件夹里放文件”这么简单。目录只是 name 和 inode 的映射；真正 metadata 在 inode。

### 41.9 考试常见题型：删除文件第 n 行

Final 很常见的 file I/O 题是：

```text
给 filename 和 n，删除文件第 n 行。
如果文件没有那么多行，就什么都不做。
程序不能输出任何东西。
```

这题的核心不是复杂算法，而是：

```text
不要一边读同一个文件，一边覆盖写同一个文件。
```

安全套路是用临时文件：

```text
打开原文件读；
打开临时文件写；
逐字符复制；
如果当前行号是 n，就跳过这一行；
最后 rename 临时文件覆盖原文件。
```

C 模板：

```c
FILE *in = fopen(filename, "r");
FILE *out = fopen(tempname, "w");

int line = 1;
int c;
while ((c = fgetc(in)) != EOF) {
    if (line != n) {
        fputc(c, out);
    }
    if (c == '\n') {
        line++;
    }
}

fclose(in);
fclose(out);
rename(tempname, filename);
```

为什么 `c` 要是 `int`？

因为 `fgetc` 可能返回真实 byte，也可能返回 `EOF`。`EOF` 是 int，不是普通 char。

如果题目说：

```text
Assume a line is zero or more characters followed by '\n'
```

那就可以放心用 newline 判断行号。

常见坑：

- 删除第一行时 line 初值写错；
- 忘记 `fclose` 就 `rename`；
- 输出 debug text，违反题目要求；
- 调用 `system`, `fork`, `exec` 之类外部程序，通常题目禁止。

### 41.10 考试常见题型：打印文件前 n 个 bytes / 去掉最后 |n| 个 bytes

22T2 final 还有一道很好的 file 题，专门提醒你：

```text
文件不一定是 ASCII text，可能含有 NUL byte。
```

题型是：

```text
如果 n >= 0，打印文件前 n 个 bytes；
如果 n < 0，打印文件除了最后 |n| 个 bytes 以外的所有内容。
```

这题为什么不能用 `fgets`、`strlen` 这种 string 思维？

因为文件可能含有：

```text
0x00
```

也就是 NUL byte。对 string 函数来说它像“结束符”，但对文件来说它只是普通 byte。

这类题更适合用：

- `fseek`
- `ftell`
- `fgetc`
- `putchar`

基本套路：

```text
先求文件大小 file_size；
决定要打印多少 bytes；
把文件位置移回开头；
逐 byte 读并打印。
```

求文件大小常见写法：

```c
fseek(file, 0, SEEK_END);
long size = ftell(file);
fseek(file, 0, SEEK_SET);
```

如果 `n >= 0`：

```text
要打印的 bytes = min(n, size)
```

如果 `n < 0`：

```text
要打印的 bytes = max(0, size - |n|)
```

然后循环这么多次：

```c
for (long i = 0; i < bytes_to_print; i++) {
    int c = fgetc(file);
    putchar(c);
}
```

Tutor 提醒：这题本质上是在训练你区分：

```text
file 是 byte stream
string 是以 '\0' 结尾的字符序列
```

### 41.11 考试常见题型：递归搜索目录

还有一种 files 题会让你递归遍历目录，按条件打印路径。

关键词通常是：

```text
opendir
readdir
closedir
directory depth
name filter
recursive search
```

核心模型：

```text
打开目录；
一项一项读 dirent；
拼出完整路径；
检查当前项是否匹配打印条件；
如果当前项本身是目录，就递归进去继续搜。
```

这类题通常会有：

- `name` 过滤；
- `min_depth`；
- `max_depth`。

所以你需要把“当前深度”作为递归参数传下去。

伪代码：

```text
search(directory, depth):
    open directory
    for each entry:
        path = directory + "/" + entry->d_name
        if entry matches filters:
            print path
        if entry is a directory:
            search(path, depth + 1)
    close directory
```

要注意的一点是：

```text
就算当前目录项自己不匹配打印条件，
也仍然可能要递归搜它里面。
```

另一个容易晕的点是 `.` 和 `..`：

- 有些题会把它们也当普通名字匹配；
- 但如果你对 `.` / `..` 无脑递归，就会无限循环。

所以通常做法是：

```text
打印是否打印，按题意判断；
是否递归进去，单独判断并避开 . 和 ..
```

## 42. Floating Point：IEEE 754 和“近似”的代价

C 的 floating point 类型：

```text
float        通常 32-bit
double       通常 64-bit
long double  平台相关，可能 80/128-bit
```

浮点常量例如 `3.14159`、`1.0e-9` 默认是 `double`。

注意：

```c
4 / 7      // int division，结果是 0
4 / 7.0    // double division，结果约 0.571428...
```

### 42.1 小数在不同进制

十进制：

```text
0.75 = 7*10^-1 + 5*10^-2
```

二进制：

```text
0.11_2 = 1*2^-1 + 1*2^-2 = 0.5 + 0.25 = 0.75
```

十六进制：

```text
0.C_16 = 12*16^-1 = 0.75
```

把 decimal fraction 转 binary 的算法：

1. 小数部分乘 2；
2. 整数部分成为下一位 binary digit；
3. 保留小数部分继续；
4. 直到结束或达到足够精度。

有些小数永远不会结束，比如 `0.1`。

### 42.2 为什么浮点数有误差

有限 bits 只能表示有限个 bit patterns，所以只能精确表示有限个实数。大多数实数没有精确表示，只能选最近的可表示值。

这就是误差来源。

通常没事，但在某些场景会造成严重问题。

### 42.3 Fixed point vs floating point

Fixed point 是把数乘一个固定常数后存成整数。

例如保留三位小数：

```text
56.125 -> 56125
```

优点：简单。

缺点：范围和精度固定，不灵活。

Floating point 类似科学计数法：

```text
1.xxxxx * 2^exponent
```

好处是范围大得多。

### 42.4 IEEE 754

IEEE 754 浮点数由三部分组成：

```text
sign + exponent + fraction
```

Single precision binary32：

```text
1 sign bit
8 exponent bits
23 fraction bits
```

Double precision binary64：

```text
1 sign bit
11 exponent bits
52 fraction bits
```

Exponent 用 bias 存储。single precision bias 是 127。

Normalised fraction 省略开头那个 `1.`，所以 fraction bits 只存小数点后的部分。

### 42.5 分布不均匀

Floating point numbers 不是均匀分布的。

靠近 0 时更密；数越大，两个相邻可表示数之间距离越大。

例如 double：

- 在 1 和 2 之间有很多密集的值；
- 到非常大的数附近，相邻 double 可能差 0.25、1、甚至更多。

所以大数上做细小加法可能完全没效果。

### 42.6 Infinity 和 NaN

IEEE 754 有 infinity：

```c
double x = 1.0 / 0.0;  // inf
```

也有 NaN：

```c
double x = 0.0 / 0.0;  // NaN
```

NaN 的特点之一：

```c
x == x
```

如果 `x` 是 NaN，结果是 false。

### 42.7 不要用 `==` 比较浮点数

因为浮点数有近似误差：

```c
0.1 + 0.2 == 0.3
```

可能不是 true。

通常用 tolerance：

```c
fabs(a - b) < 1e-9
```

Tutor 提醒：浮点数不是数学实数。它是“用固定 bits 存下来的近似科学计数法”。

## 43. Integers：进制、two's complement、类型大小

这一章从“数字怎么写”讲到“整数怎么存在机器里”。

### 43.1 进制

十进制 `4705`：

```text
4*10^3 + 7*10^2 + 0*10^1 + 5*10^0
```

二进制 `1011_2`：

```text
1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 = 11
```

十六进制 `0x3AF1`：

```text
3*16^3 + 10*16^2 + 15*16^1 + 1
```

C 里：

```c
0x2A      // hex, 42
052       // octal, 42
0b101010  // binary, newer compiler support varies
```

### 43.2 Hex 和 binary 的关系

1 hex digit = 4 bits。

```text
0xA = 1010
0xF = 1111
0x2A = 0010 1010
```

所以看 bit pattern 时，hex 比 decimal 直观。

### 43.3 Unsigned 和 signed

Unsigned n-bit integer 范围：

```text
0 到 2^n - 1
```

Signed two's complement n-bit integer 范围：

```text
-2^(n-1) 到 2^(n-1)-1
```

8-bit signed：

```text
-128 到 127
```

8-bit unsigned：

```text
0 到 255
```

### 43.4 Two's complement

现代机器几乎都用 two's complement 表示负数。

8-bit 中：

```text
-5 = 2^8 - 5 = 251 = 11111011
```

two's complement 的好处是：加法电路可以统一处理正负数。

例如：

```text
5 + (-5)
00000101
11111011
--------
00000000  忽略溢出的第 9 位
```

### 43.5 `sizeof` 和类型范围

`sizeof` 返回 bytes，不是 bits。

常见 C 类型在 CSE 类环境大致：

```text
char      1 byte  = 8 bits
short     2 bytes = 16 bits
int       4 bytes = 32 bits
long      8 bytes = 64 bits
long long 8 bytes = 64 bits
```

但 C 标准不保证所有机器完全一样。

如果需要固定大小，用：

```c
#include <stdint.h>

int8_t
uint8_t
int16_t
uint16_t
int32_t
uint32_t
int64_t
uint64_t
```

### 43.6 EOF 和 char bug

`getchar()` 返回 `int`，不是 `char`，因为它需要能返回所有 byte 值，还要额外返回：

```c
#define EOF -1
```

错误写法：

```c
char c;
while ((c = getchar()) != EOF) {
    putchar(c);
}
```

应该：

```c
int c;
while ((c = getchar()) != EOF) {
    putchar(c);
}
```

### 43.7 Endianness

多 byte integer 在 memory 里有 byte order。

常见：

- little-endian：least significant byte 存在低地址；
- big-endian：most significant byte 存在低地址。

这会影响你用 byte pointer 查看 integer 内存时看到的顺序。

## 44. MIPS Basics：汇编、CPU、指令和 register

为什么学 assembler？

- 理解 compiled programs 如何执行；
- debug 更有底；
- 理解 performance；
- 某些 low-level 场景必须写；
- 系统编程、driver、security 等都需要底层概念。

### 44.1 CPU 组成

典型 CPU 包含：

- data registers；
- control registers，包括 PC；
- control unit；
- ALU；
- FPU；
- caches；
- memory interface；
- MMU；
- simple instructions。

CPU 的核心动作：

```text
从 memory/register 拿数据
用 ALU/FPU 计算
根据 branch 改变控制流
```

### 44.2 MIPS architecture

COMP1521 用 MIPS32，并通过 simulator 而不是真实 MIPS hardware。

MIPS 指令是 32-bit bit patterns。

主要类别：

- arithmetic；
- logical/bit manipulation；
- load/store；
- branch/jump；
- syscall。

### 44.3 Registers

MIPS 有 32 个 general-purpose integer registers。

重要的：

```text
$zero  永远是 0
$v0    return value / syscall code
$a0-$a3 arguments
$t0-$t9 temporaries
$s0-$s7 saved registers
$sp    stack pointer
$fp    frame pointer
$ra    return address
```

Register 是 CPU 里的小而快的存储。大多数计算都在 register 上做。

### 44.4 Arithmetic instructions

常见：

```mips
add  $d, $s, $t
sub  $d, $s, $t
mul  $d, $s, $t
div  $d, $s, $t
rem  $d, $s, $t
addi $t, $s, imm
```

MIPS 没有真正 `subi` 的概念，通常用 `addi` 加负数。

### 44.5 Load/store 思想

MIPS 是 load/store architecture：

```text
只有 load/store 指令访问 memory
算术指令只操作 registers
```

所以 C 里的：

```c
x = y + z;
```

如果变量在 memory，MIPS 需要：

1. load y；
2. load z；
3. add；
4. store x。

这条思想贯穿后面 MIPS data。

## 45. MIPS Control：条件和循环

这一章进一步系统化 C 到 MIPS 的翻译。

### 45.1 先 simplified C，再 MIPS

直接翻 C 很难，所以先拆成 simplified C：

- 每行尽量对应一条 MIPS；
- 复杂表达式拆成临时变量；
- if/while/for 改成 `goto` 和 labels。

### 45.2 If 翻译模式

C：

```c
if (i < n) {
    x = x + 1;
}
```

Simplified C：

```c
if (i >= n) goto if_end;
x = x + 1;
if_end:
```

MIPS：

```mips
        bge     $t0, $t1, if_end
        addi    $t2, $t2, 1
if_end:
```

核心：用相反条件跳过 body。

### 45.3 If/else 模式

```c
if (cond) {
    A;
} else {
    B;
}
```

变成：

```c
if (!cond) goto else_label;
A;
goto if_end;
else_label:
B;
if_end:
```

MIPS 也是同样结构。

### 45.4 While 模式

C：

```c
while (i < 10) {
    printf("%d\n", i);
    i++;
}
```

Simplified：

```c
loop_cond:
    if (i >= 10) goto loop_end;
loop_body:
    printf("%d\n", i);
loop_step:
    i++;
    goto loop_cond;
loop_end:
```

MIPS loop 永远盯住：

```text
condition branch to end
body
step
branch back to condition
```

### 45.5 例：Sum 100 Squares

C：

```c
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i * i;
}
```

Register plan：

```text
$t0 = sum
$t1 = i
$t2 = i*i
```

MIPS：

```mips
        li      $t0, 0
        li      $t1, 1
loop_cond:
        bgt     $t1, 100, loop_end
        mul     $t2, $t1, $t1
        add     $t0, $t0, $t2
        addi    $t1, $t1, 1
        b       loop_cond
loop_end:
```

### 45.6 考试常见题型：读数直到 sum 达到条件

Final 的 MIPS control 题常常长这样：

```c
int sum = 0;
while (sum < 42) {
    int x;
    scanf("%d", &x);
    sum += x;
}
printf("%d\n", sum);
```

翻译前先写成 goto 思维：

```text
sum = 0

loop_condition:
    if sum >= 42 goto loop_end

loop_body:
    read x
    sum = sum + x
    goto loop_condition

loop_end:
    print sum
```

MIPS 模板：

```mips
        li      $t0, 0              # sum

loop_condition:
        bge     $t0, 42, loop_end

        li      $v0, 5
        syscall
        add     $t0, $t0, $v0

        b       loop_condition

loop_end:
        li      $v0, 1
        move    $a0, $t0
        syscall

        li      $v0, 11
        li      $a0, '\n'
        syscall
```

这类题常见要求：

```text
one integer, a newline, and nothing else
```

所以不要打印 prompt。

### 45.7 考试常见题型：读两个数算表达式

比如：

```c
scanf("%d", &a);
scanf("%d", &b);
printf("%d\n", a * a + b * b);
```

MIPS 思路：

```text
read_int -> 保存 a
read_int -> 保存 b
mul a*a
mul b*b
add
print_int
print newline
```

重点是：`syscall` 读整数后，结果在 `$v0`。下一次设置 syscall code 也要用 `$v0`，所以读完要马上 move 到 `$t` register。

```mips
        li      $v0, 5
        syscall
        move    $t0, $v0

        li      $v0, 5
        syscall
        move    $t1, $v0

        mul     $t2, $t0, $t0
        mul     $t3, $t1, $t1
        add     $t4, $t2, $t3
```

### 45.8 考试常见题型：array scan 找最长递增 run

还有一种 MIPS control 题会把 loop 和 array 放一起。

典型题型：

```text
先读 10 个整数到数组；
再输出其中最长 strictly increasing consecutive run 的长度。
```

这题本质上还是两个 while loops：

1. 先把输入读进数组；
2. 再扫数组，维护 `current_run` 和 `max_run`。

C 逻辑：

```c
max_run = 1;
current_run = 1;
i = 1;
while (i < 10) {
    if (numbers[i] > numbers[i - 1]) {
        current_run++;
    } else {
        current_run = 1;
    }

    if (current_run > max_run) {
        max_run = current_run;
    }
    i++;
}
```

MIPS 难点不是算法，而是：

```text
numbers[i] 的地址怎么算
numbers[i - 1] 的地址怎么算
```

如果数组是 `int numbers[10]`，每个元素 4 bytes：

```text
&numbers[i] = base + i * 4
```

所以这题是 MIPS Control 和 MIPS Data 的合体：control flow 没变，难点只是把 array indexing 写对。

## 46. MIPS Data：memory、arrays、structs、alignment

这章重点是把 C 数据结构落实到 bytes。

### 46.1 Memory 是 byte array

Memory 可以想成：

```text
mem[address] = one byte
```

每个 byte 有唯一 address。

MIPS32/mipsy 里 address 是 32-bit。

### 46.2 Load/store 指令

读：

```mips
lb   $t0, offset($t1)   # signed byte
lbu  $t0, offset($t1)   # unsigned byte
lh   $t0, offset($t1)   # signed halfword
lhu  $t0, offset($t1)   # unsigned halfword
lw   $t0, offset($t1)   # word
```

写：

```mips
sb   $t0, offset($t1)
sh   $t0, offset($t1)
sw   $t0, offset($t1)
```

`lb/lh` 会 sign-extend；`lbu/lhu` 会 zero-extend。

### 46.3 Directives

```mips
.text
.data
.space 18
.align 2
.word 42
.word 1, 3, 5
.half 2, 4, 6
.byte 7:5
```

含义：

- `.text` 放 instructions；
- `.data` 放 data；
- `.space n` 留 n bytes；
- `.align 2` 对齐到 `2^2 = 4` byte；
- `.word` 放 32-bit；
- `.half` 放 16-bit；
- `.byte` 放 8-bit。

### 46.4 Global variables

C：

```c
int global_counter = 0;
```

MIPS data：

```mips
        .data
global_counter:
        .word 0
```

Increment：

```mips
        lw      $t1, global_counter
        addi    $t1, $t1, 1
        sw      $t1, global_counter
```

### 46.5 Array 地址计算

一维数组：

```text
&array[i] = base + i * sizeof(element)
```

如果 `int x[10]`，每个 element 4 bytes：

```mips
        mul     $t2, $t1, 4      # offset = i * 4
        la      $t3, x
        add     $t4, $t3, $t2
        lw      $t5, 0($t4)
```

二维数组 row-major：

```text
&array[row][col] = base + (row * num_cols + col) * sizeof(element)
```

### 46.6 Alignment

一些类型必须放在对齐地址上：

- `int` 4 bytes，通常要求地址能被 4 整除；
- `short` 2 bytes，要求地址能被 2 整除；
- `char` 没有额外对齐要求。

用 `.align` 可以避免手算 padding。

### 46.7 Structs

Struct field 在 MIPS 里靠 offset 访问，不靠名字。

C：

```c
struct student {
    int zid;
    char first[20];
    char last[20];
    int program;
};
```

MIPS 里会定义 constants：

```mips
STUDENT_OFFSET_ZID = 0
STUDENT_OFFSET_FIRST = 4
STUDENT_OFFSET_LAST = 24
STUDENT_OFFSET_PROGRAM = 44
```

访问：

```mips
        lw      $a0, STUDENT_OFFSET_ZID($t0)
```

Tutor 提醒：C 的 `student.program` 在底层就是 `base + offset`。

### 46.8 考试常见题型：MIPS 大整数

Final 里最难的 MIPS data 题可能会说：

```text
输入很大的整数表达式，只包含数字、+、*。
整数可能大到 32-bit/64-bit register 都放不下。
不能用 floating point。
```

这题本质上考的是：

```text
当 register 放不下一个数字时，你能不能用 memory array 自己模拟整数？
```

常见做法：用十进制 digit array，倒序存。

例如：

```text
12345
```

存成：

```text
digits[0] = 5
digits[1] = 4
digits[2] = 3
digits[3] = 2
digits[4] = 1
length = 5
```

为什么倒序？

因为加法、乘法都从个位开始，个位放在 index 0 时 carry 最好处理。

大整数加法：

```text
carry = 0
for i = 0 到 max_len:
    tmp = a[i] + b[i] + carry
    result[i] = tmp % 10
    carry = tmp / 10
如果最后 carry > 0，放到最高位
```

大整数乘法：

```text
result 清零
for i in a:
    for j in b:
        result[i + j] += a[i] * b[j]
最后从低位到高位处理 carry
```

如果表达式有 `+` 和 `*`，通常按 term 思路处理：

```text
total = 0
current_product = 1

读 number，乘进 current_product
遇到 '*': 继续读 number，继续乘
遇到 '+': total += current_product，current_product = 1
到行尾: total += current_product
```

打印时因为 digits 倒序存，要从最高位往低位打印：

```text
for i = length - 1 downto 0:
    print digit[i] + '0'
```

如果考试时间不够，这类题通常 partial marks 很重要。救分顺序：

1. 能读入一行；
2. 能 parse 一个大整数；
3. 能做大整数加法；
4. 能打印大整数；
5. 再做乘法和完整表达式。

## 47. MIPS Functions：调用约定、stack、prologue/epilogue

函数调用在 C 里很自然，但 MIPS 必须明确处理控制流和保存状态。

### 47.1 Function call 发生什么

C：

```c
res = fun(expr1, expr2);
```

底层步骤：

1. caller 计算 arguments；
2. arguments 放到 `$a0-$a3` 或 stack；
3. `jal fun` 跳到 function；
4. function 执行；
5. return value 放 `$v0`；
6. `jr $ra` 回到 caller。

### 47.2 `jal` 和 `jr $ra`

```mips
jal hello
```

做两件事：

- 把下一条 instruction 的地址放进 `$ra`；
- 跳到 `hello`。

```mips
jr $ra
```

跳回 `$ra` 保存的地址。

### 47.3 参数和返回值

约定：

```text
$a0-$a3  前四个参数
$v0      返回值
```

例：

```c
int product(int x, int y) {
    return x * y;
}
```

MIPS：

```mips
product:
        mul     $v0, $a0, $a1
        jr      $ra
```

这是 leaf function，因为它不调用其他函数。

### 47.4 为什么要保存 `$ra`

如果函数 A 调用函数 B：

```mips
A:
        jal B
        jr $ra
```

`jal B` 会覆盖 `$ra`。如果 A 没有先保存自己的 `$ra`，它就忘了该回到哪里。

所以 non-leaf function 要在 prologue 保存 `$ra`，epilogue 恢复。

### 47.5 Stack、prologue、epilogue

手动版本：

```mips
        sub     $sp, $sp, 12
        sw      $ra, 8($sp)
        sw      $s1, 4($sp)
        sw      $s0, 0($sp)

        # function body

        lw      $s0, 0($sp)
        lw      $s1, 4($sp)
        lw      $ra, 8($sp)
        add     $sp, $sp, 12
        jr      $ra
```

mipsy 也有 pseudo-instructions：

```mips
push $ra
push $s0
...
pop  $s0
pop  $ra
```

注意 pop 顺序要和 push 相反。

### 47.6 Calling conventions

重要约定：

- caller 可以假设 `$s0-$s7` 在 call 后不变；
- callee 如果使用 `$s` registers，必须保存并恢复；
- caller 不能假设 `$t0-$t9` 在 call 后不变；
- `$sp` 也应该在 call 后恢复到原样。

Tutor 提醒：函数调用的本质是“大家提前约定好哪些 register 谁负责保护”。不守约定，程序就会莫名坏。

### 47.7 考试常见题型：递归 expression parser

Final 可能给你一个 C parser，让你用 MIPS 写同样行为。

例如 boolean expression：

```text
expression -> term ('|' expression)?
term       -> value ('&' term)?
value      -> 'T' or 'F'
```

C 结构类似：

```c
int expression(void) {
    int lhs = term();
    if (*s != '|') {
        return lhs;
    }
    s++;
    int rhs = expression();
    return lhs || rhs;
}
```

这题考的不是 boolean 本身，而是：

- MIPS function call；
- recursion；
- stack frame；
- global pointer；
- 保存跨函数调用还要用的值。

为什么 `&` 优先级比 `|` 高？

因为：

```text
expression 先调用 term
term 先处理 value 和 &
expression 最后才处理 |
```

所以：

```text
F|T&F
```

应该理解成：

```text
F | (T & F)
```

结果是 F。

这类题的 MIPS 关键点：

```text
返回值放 $v0
调用其他函数用 jal
只要函数里还会 jal，就要保存 $ra
lhs 这种跨递归调用还要用的值，要放 $s register 或 stack
```

全局变量 `char *s` 在 MIPS 里通常是一个 word，里面存 pointer。

访问 `*s`：

```mips
        la      $t0, s
        lw      $t1, 0($t0)      # $t1 = s
        lb      $t2, 0($t1)      # $t2 = *s
```

执行 `s++`：

```mips
        addi    $t1, $t1, 1
        sw      $t1, 0($t0)
```

注意 `s` 是 char pointer，所以 `s++` 加 1，不是加 4。

常见坑：

- 忘记保存 `$ra`，递归后回不去；
- lhs 放 `$t0`，但递归调用可能覆盖 `$t0`；
- prologue push 了 `$s0`，epilogue 忘记 pop；
- 把 ASCII `'T'` 和 integer 1 混淆。

### 47.8 考试常见题型：Hanoi / 递归 + pointer 操作

22T2 final 还有一题很典型：给你 C 版递归函数和 helper，让你翻成 MIPS。

像 Towers of Hanoi 这种题，表面看是游戏，底层考点其实是：

- non-leaf function；
- recursive calls；
- pointer arithmetic；
- while loop；
- 多个 local variables 同时活着。

这类题的难点在于：

```text
函数里不止一次 jal；
而且递归前后还要继续用很多变量。
```

所以你通常不能只存 `$ra`，还要把这些会跨调用继续用的值放进：

- `$s0-$s7`
- 或 stack slots

例如：

```text
size
target
peg1
peg2
peg_max
source
other
```

都可能需要在多个调用之间活着。

这类题的 tutor 重点是：

```text
先把 C 函数的 local variables 列出来；
再决定哪些放 $s register，哪些临时放 $t register；
递归前确认会被 jal 覆盖的值已经保存。
```

另外像：

```c
while (*peg_max != *(peg_max + 1)) {
    ...
    peg_max++;
}
```

这种 pointer 代码在 MIPS 里要很小心：

```text
char * 加 1，不是加 4。
```

## 48. Processes：程序运行环境与 Unix 进程

Process 是一个正在执行的 program instance。

它包含：

- CPU register state；
- memory contents；
- open files；
- PID；
- parent PID；
- environment variables；
- current working directory。

### 48.1 PID 和 parent process

每个 process 有 PID：

```c
getpid()
getppid()
```

每个 process 有 parent。如果 parent 结束，child 会被 PID 1 接管。

Unix 工具：

```bash
ps
top
w
kill
```

### 48.2 Environment variables

程序启动时会收到 environment：

```text
NAME=value
```

常见：

```text
PATH
HOME
LANG
TZ
```

C 中用：

```c
getenv("PATH");
setenv("STATUS", "ok", 1);
```

Environment 是向子程序传设置的一种简单方式。

### 48.3 Preemption 和 scheduling

OS 让多个 processes 看起来同时运行。

一个 process 运行一段时间后可能被 preempt：

- 时间片用完；
- 等待 I/O；
- OS 决定切换。

切换时 OS 保存当前 process state，恢复另一个 process state。

哪个 process 下一个运行，由 scheduler 决定。

### 48.4 创建和替换进程

旧方式：

```c
fork();
exec();
```

`fork` 复制当前进程：

- child 中返回 0；
- parent 中返回 child PID；
- 失败返回 -1。

但 notes 明确说：新代码推荐 `posix_spawn()`，不要优先用 `fork()`。

`exec` 用另一个程序替换当前 process：

```c
execv("/bin/echo", argv);
```

成功时不会返回。

### 48.5 waitpid

Parent 等 child：

```c
waitpid(pid, &status, 0);
```

作用：

- 等 child state change；
- 获取 exit status；
- 释放 child 资源。

如果 parent 不处理 child 退出通知，会留下 zombie process。

### 48.6 posix_spawn

推荐创建新 process：

```c
posix_spawn(&pid, "/bin/date", NULL, NULL, argv, environ);
waitpid(pid, &status, 0);
```

它比 `system()` 更安全，因为不用通过 shell 拼命令字符串。

### 48.7 Pipes

Pipe 是 OS 提供的单向 byte stream：

```c
int pipefd[2];
pipe(pipefd);
```

- `pipefd[0]`：read end；
- `pipefd[1]`：write end。

Parent/child 可以通过 pipe 传 bytes。使用时要关闭自己不用的一端。

### 48.8 考试常见题型：写一个简单 shell

22T2 final 最后一题本质上是把 processes、cwd、PATH、globbing 放到一起。

一个最小 shell 要会做这些事：

- `exit`
- `cd`
- `pwd`
- 执行 qualified command，比如 `/bin/ls` 或 `./prog`
- 手动搜索 `PATH` 执行 unqualified command，比如 `ls`
- 对 arguments 做 globbing，比如 `*`、`~`

这题背后的系统知识点很多：

### `cd` 和 `pwd`

`cd` 不是外部程序，而是 shell 自己要做的事。

为什么？

因为：

```text
如果 shell 只是 spawn 一个子进程去运行 cd，
改的是子进程的 cwd，不是 shell 自己的 cwd。
```

所以 shell 必须自己调用：

- `chdir`
- `getcwd`

### 执行外部程序

这类题通常要求：

```text
用 posix_spawn，不准用 system，不准用 exec 系列。
```

基本流程：

```text
tokenize 输入
构造 argv
检查 command 是否 executable
posix_spawn
waitpid
```

为什么还要 `waitpid`？

因为 shell 应该等当前命令执行完，再继续显示 prompt。

### PATH 搜索

如果命令里没有 `/`，说明它是 unqualified command。

就要：

```text
取 PATH 环境变量
按 ':' 切开每个目录
拼出 dir/command
找第一个 executable 的路径
再用 posix_spawn 执行
```

注意题目常常明确说：

```text
不能偷懒用 posix_spawnp。
```

因为它就是要你自己理解 PATH search。

### Globbing

Globbing 是：

```text
把 *、~ 这种模式展开成具体文件名。
```

重点是：

```text
展开的是 arguments，不是 command 本身。
```

Tutor 提醒：shell 题不是“杂烩题”，而是把这门课很多 OS 接口串起来：

```text
cwd
environment variables
spawn
wait
path lookup
argument expansion
```

## 49. Threads：并发、并行、共享内存和同步

### 49.1 Concurrency vs Parallelism

Concurrency：

```text
多个计算在时间上重叠，不一定同时执行。
```

Parallelism：

```text
多个计算真正同时执行。
```

### 49.2 Processes vs threads

Processes：

- 各自 address space；
- 隔离强；
- 切换和通信成本较高。

Threads：

- 同一个 process 内多条执行线；
- 共享 address space；
- 通信快；
- 更容易 data race。

Threads 共享：

- code；
- global/static variables；
- heap；
- file descriptors。

Threads 不共享：

- registers；
- stack/local variables。

### 49.3 pthreads 基础

创建线程：

```c
pthread_create(&thread_id, NULL, run_thread, argument);
```

等待线程结束：

```c
pthread_join(thread_id, NULL);
```

线程函数：

```c
void *run_thread(void *argument) {
    ...
    return NULL;
}
```

### 49.4 传参数的 lifetime 问题

线程只能拿到参数地址。

危险情况：

```c
pthread_create(&thread, NULL, my_thread, &local_variable);
return thread;
```

如果 local variable 所在函数已经 return，线程还在用这个地址，就出 bug。

解决：保证数据活得比线程久，或用 heap 分配并在线程结束时 `free`。

### 49.5 Data race

两个线程同时改同一个 global：

```c
bank_account++;
```

这不是 atomic 操作，底层可能是：

```text
load
add
store
```

两个线程交错执行时，一个更新可能覆盖另一个更新。

### 49.6 Critical section 和 mutex

Critical section 是不能让多个线程同时进入的代码区域。

Mutex：

```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

pthread_mutex_lock(&lock);
// critical section
pthread_mutex_unlock(&lock);
```

同一把 mutex 同一时间只允许一个线程持有。

### 49.7 Deadlock

如果线程 A 拿了 lock1 等 lock2，线程 B 拿了 lock2 等 lock1，就 deadlock。

避免常用规则：

```text
所有线程按同一顺序拿锁。
```

### 49.8 Atomics

C 有 `<stdatomic.h>`：

```c
atomic_int bank_account = 0;
atomic_fetch_add(&bank_account, 1);
```

Atomics 保证某些操作不可分割，能避免部分 race 和 deadlock 问题，但也有性能成本，适用范围有限。

Tutor 提醒：Concurrency 很难，不是你菜。它的 bug 常常不是每次出现，而是偶尔出现，所以更难 debug。

### 49.9 考试常见题型：用 5 个 threads 平均分文件工作

Final 的 threads 题可能要求：

```text
创建 5 个 threads；
平均分配一个文件里的工作；
不能用 global variables；
不能用 locks/mutexes；
不能把整个文件读进 memory。
```

这题真正考的是：

```text
如何通过参数传递，让每个 thread 独立处理自己的那一段数据。
```

通常会定义一个 struct：

```c
struct thread_data {
    char *filename;
    int thread_id;
    int start_line;
    int lines_to_read;
};
```

main 里用 array，给每个 thread 一份独立参数：

```c
struct thread_data data[5];
pthread_t threads[5];

for (int i = 0; i < 5; i++) {
    data[i].thread_id = i;
    data[i].filename = filename;
    data[i].start_line = i * lines_per_thread;
    data[i].lines_to_read = lines_per_thread;
    pthread_create(&threads[i], NULL, worker, &data[i]);
}
```

不要把同一个 local struct 地址传给所有 threads：

```c
struct thread_data data;
for (...) {
    data.thread_id = i;
    pthread_create(..., &data);
}
```

这样所有 threads 看到的是同一个地址，内容会被 main 的 loop 改来改去。

如果文件每行固定 10 bytes，每个 thread 可以自己打开文件并 `fseek` 到起点：

```c
long offset = start_line * 10;
fseek(fp, offset, SEEK_SET);
```

为什么每个 thread 自己 `fopen`？

因为 `FILE *` 有 file position。多个 threads 共享同一个 `FILE *`，读写位置会互相影响。

返回 count 可以用 heap：

```c
int *result = malloc(sizeof(int));
*result = count;
return result;
```

main 里：

```c
void *ret;
pthread_join(threads[i], &ret);
int *count = ret;
total += *count;
free(count);
```

这题不需要 mutex 的原因：

```text
每个 thread 只读自己的文件区域，只写自己的 local count。
main 最后 join 后再汇总。
```

常见坑：

- 创建了 5 个 threads，但没有平均分工作；
- 忘记 `pthread_join`；
- 用 global total，题目禁止；
- 用 mutex，题目明确说不要；
- 每个 thread 都从文件头开始读，导致重复读。

### 49.10 考试常见题型：多个 watcher threads 监控文件大小

22T2 final 的另一种 threads 题不是“并行算题”，而是“每个文件一个 watcher thread”。

题目通常会要求：

- 每个文件一个 thread；
- 每个 thread 定期检查自己文件的大小；
- 主线程继续接受输入；
- 所有文件总大小超过 quota 时打印一次 warning；
- 降回 quota 以下时打印一次 resolved message；
- 文件删除后对应 thread 结束；
- 全部文件都删掉后程序退出。

这类题考的不是 pthread API 会不会背，而是：

```text
多个 threads 如何安全共享“总大小”和“当前是否超额”这类状态。
```

你可以用：

- mutex；
- atomics；
- 或混合。

关键共享状态可能有：

- 每个文件当前大小；
- watched file 数量；
- 总大小；
- 现在是否已经处于 quota exceeded 状态。

这题最核心的并发要求是：

```text
warning 只打印一次；
resolved 也只打印一次；
不能因为 race 导致反复刷屏或漏打印。
```

所以“检查总大小并决定是否打印状态变化”的那一段，必须是同步保护过的 critical section。

另一个重点是：

```text
每个文件必须由单独 thread 调 file_size。
```

题目甚至会故意让 `file_size` 对“同一线程查多个文件”报错，所以你不能偷懒让一个 worker 扫全部文件。

Tutor 提醒：这题很像现实世界里的 monitor/service 程序。它不是一次性算完退出，而是：

```text
持续运行
持续观察
在状态变化时做出一次性反应
```

## 50. Unicode：文本不是 plain text

这一章回答：文字怎么存在电脑里？

电脑只存 bytes。文字必须通过 encoding 变成 bytes。

### 50.1 为什么需要 encoding

String 是 characters 的序列。要把 characters 存进电脑，必须给每个 character 一个表示方法。

历史上有很多 encoding：

- Morse code；
- telegraph encodings；
- ASCII；
- Extended ASCII；
- EBCDIC；
- Unicode。

### 50.2 Character encoding 是 lookup table

不像 two's complement 或 IEEE 754，很多字符编码本质上不是数学公式，而是 lookup table：

```text
字符 A -> 编号 65
字符 B -> 编号 66
```

### 50.3 ASCII

ASCII 是 7-bit encoding，只能表示 128 个值：

- English letters；
- digits；
- punctuation；
- control characters，比如 newline。

ASCII 对英语足够，对世界绝大多数文字不够。

### 50.4 Unicode

Unicode 给字符分配 code points。

Unicode codespace：

```text
0x0000 到 0x10FFFF
```

例如：

```text
U+0041  字符 A
```

Code point 不是 bytes。它只是“字符编号”。

### 50.5 UTF-8

UTF-8 是把 Unicode code point 编成 bytes 的方式。

特点：

- ASCII 字符仍用 1 byte；
- 非 ASCII 字符用 2、3、4 bytes；
- 和 C string 的 byte array 模型兼容性较好；
- 现代系统非常常用。

重点：

```text
一个 character 不一定是一个 byte。
```

更麻烦的是，一个用户眼里的字符也不一定是一个 code point。例如某些 emoji 或带音标字符可能由多个 code points 组成。

### 50.6 这章最大 takeaway

不存在“不带编码的纯文本”。只要看到 text，就要问：

```text
它是什么 encoding？
```

否则同一串 bytes 在不同 encoding 下可能显示成完全不同的字符，甚至乱码。

### 50.7 考试常见题型：替换 invalid UTF-8 sequences

Final 很常见的 Unicode 题型是：

```text
给一个 UTF-8 encoded string，返回新 string，把 invalid UTF-8 sequences 替换成 '?'。
```

先记住 UTF-8 的 byte pattern：

```text
1 byte:   0xxxxxxx
2 bytes:  110xxxxx 10xxxxxx
3 bytes:  1110xxxx 10xxxxxx 10xxxxxx
4 bytes:  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

Continuation byte 永远长这样：

```text
10xxxxxx
```

判断 byte 类型常用 mask：

```c
if ((b & 0x80) == 0x00) {
    // ASCII
} else if ((b & 0xE0) == 0xC0) {
    // 2-byte starter
} else if ((b & 0xF0) == 0xE0) {
    // 3-byte starter
} else if ((b & 0xF8) == 0xF0) {
    // 4-byte starter
} else {
    // invalid starter or standalone continuation
}
```

判断 continuation：

```c
(b & 0xC0) == 0x80
```

实用算法：

```text
i 读 input
j 写 output

while input[i] != '\0':
    看 input[i] 是哪种 starter
    如果 ASCII：copy 1 byte
    如果是 2/3/4-byte starter：
        检查后面需要的 continuation bytes
        全合法：copy 整段
        不合法：output '?'
    如果是 standalone continuation 或 invalid starter：
        output '?'

最后 output[j] = '\0'
```

最容易漏的是这条规则：

```text
如果一个 valid starting byte 出现在另一个 UTF-8 sequence 中间，
它不能被当作新 sequence 的开头。
整个原 sequence 应该 invalid，替换成一个 '?'。
```

也就是说，如果一个 3-byte starter 后面第三个 byte 坏了，这整个 sequence 输出一个 `?`，而不是从中间重新开始。

为什么通常可以：

```c
malloc(strlen(input) + 1)
```

因为合法 sequence 原样复制，非法 sequence 用一个 `?` 替换，output 一般不会比 input 更长。

一定要用：

```c
unsigned char b = input[i];
```

否则 signed `char` 遇到高位为 1 的 byte，bitwise 判断会很难看。

常见坑：

- 忘记加 `'\0'`；
- 返回 local array；
- 单独 continuation byte 没替换成 `?`；
- 不完整 sequence 没处理；
- 从 Unicode code point 的角度想太多。这题主要是 byte pattern validation。

### 50.8 考试常见题型：按 code point range 截取 UTF-8 string

22T2 final 还有一道 Unicode 题不是检查合法性，而是：

```text
给一个 valid UTF-8 string，
按 code point index 截取 [range_start, range_end) 这一段。
```

这里最重要的理解是：

```text
index 的单位不是 byte，而是 UTF-8 code point。
```

所以：

```text
"hello"
```

每个字符 1 byte，byte index 和 code point index 刚好一样。

但：

```text
"🍓🍇🍈"
```

每个 emoji 可能 4 bytes。你不能直接拿：

```c
utf8_string + range_start
```

那样是按 byte 跳，不是按字符跳。

正确思路：

1. 从左到右扫 string；
2. 每遇到一个新的 UTF-8 starter，就说明到了下一个 code point；
3. 找到 range_start 对应的 byte 位置；
4. 找到 range_end 对应的 byte 位置；
5. 分配新字符串，把这段 bytes 复制出来。

因为题目保证输入是 valid UTF-8，所以你不用做 50.7 那种 invalid sequence 修复，只要正确识别每个 code point 占几 bytes。

一个 starter 占几 bytes，可以靠首 byte 判断：

```text
0xxxxxxx  -> 1 byte
110xxxxx  -> 2 bytes
1110xxxx  -> 3 bytes
11110xxx  -> 4 bytes
```

然后 pointer 前进对应长度。

Tutor 提醒：这题本质上是在训练你分清：

```text
byte index
character/code point index
```

UTF-8 最让人脑壳疼的地方，很多时候就在这。

