# COMP1521 程序执行总图：C、MIPS、CPU、RAM、Cache、Register

这份笔记专门回答一个问题：

```text
我写了一个 program，到它真正执行，中间到底发生了什么？
```

## 1. 总体流程

完整流程可以先记成这一条线：

```text
C source code
    ↓ compiler
assembly code
    ↓ assembler
machine code / object file
    ↓ linker
executable file
    ↓ OS loader
process in RAM
    ↓ CPU fetch / decode / execute
程序运行
```

对应解释：

```text
C source code:
    你写的 C 代码，给人看的。

assembly code:
    更接近 CPU 的文字版指令，例如 MIPS assembly。

machine code:
    CPU 真正执行的二进制指令。

executable:
    完整的可执行文件，里面不只有 machine code，还有程序怎么被 OS 加载的信息。

process:
    executable 运行起来后，OS 在 RAM 里创建的程序实例。
```

## 2. 所有主要部件的关系

可以先看这张图：

```text
SSD / HDD
    ↓
RAM / main memory
    ↓
cache
    ↓
registers
    ↓
ALU
```

从慢到快：

```text
SSD/HDD < RAM < cache < registers
```

从大到小：

```text
SSD/HDD > RAM > cache > registers
```

最短理解：

```text
SSD/HDD:
    长期保存文件，比如 .c 文件和 executable。

RAM:
    程序运行时主要待的地方。

cache:
    CPU 和 RAM 中间的高速小缓存。

registers:
    CPU 里面最快的小存储位置。

ALU:
    CPU 里面真正做加减、比较、bitwise 运算的部件。
```

## 3. CPU 是什么

CPU 是 central processing unit，中央处理器。

它负责执行程序指令。

CPU 的基本循环：

```text
fetch:
    取下一条 instruction

decode:
    理解这条 instruction 要做什么

execute:
    执行这条 instruction
```

可以想成：

```c
while (program_is_running) {
    instruction = memory[program_counter];
    program_counter++;
    execute(instruction);
}
```

真实 CPU 更复杂，但这个模型足够理解 COMP1521。

## 4. CPU 里面有什么

简化版：

```text
CPU
├── registers
├── program counter
├── ALU
├── control unit / decoder
├── cache
└── special registers
```

### 4.1 Registers

registers 是 CPU 里面最快的小存储位置。

MIPS 常见 registers：

```text
$zero   永远是 0
$v0     return value / syscall number
$a0-$a3 function arguments
$t0-$t9 temporary registers
$s0-$s7 saved registers
$sp     stack pointer
$fp     frame pointer
$ra     return address
```

比如：

```mips
add $t0, $t1, $t2
```

意思是：

```text
$t0 = $t1 + $t2
```

这个计算发生在 CPU 里，操作数来自 registers。

### 4.2 Program counter

program counter，简称 PC。

它记录：

```text
下一条要执行的 instruction 在哪里。
```

普通 instruction 执行完，PC 去下一条。

这些 instruction 会改变 PC：

```mips
j label
beq $t0, $t1, label
bne $t0, $t1, label
jal function
jr $ra
```

所以：

```text
if、while、function call、return，底层都和改变 PC 有关。
```

### 4.3 ALU

ALU 是 arithmetic logic unit。

它负责：

```text
加法
减法
比较
bitwise and / or / xor
shift
```

例如：

```mips
add $t0, $t1, $t2
```

就是 ALU 在做：

```text
$t1 + $t2
```

然后结果写进 `$t0`。

### 4.4 Control unit / decoder

CPU 取到一条 instruction 后，要知道它是什么意思。

例如：

```mips
add $t0, $t1, $t2
```

decoder 会理解成：

```text
这是 add instruction；
读 $t1 和 $t2；
让 ALU 做加法；
结果写进 $t0。
```

### 4.5 Cache

cache 是 CPU 和 RAM 之间的高速小内存。

关系：

```text
CPU
 ↓
cache
 ↓
RAM
```

CPU 要读数据时：

```text
先看 cache 有没有；
有就是 cache hit；
没有就是 cache miss，然后去 RAM 拿。
```

cache 有用是因为程序有局部性：

```text
时间局部性:
    刚用过的数据，很可能马上再用。

空间局部性:
    用了某个地址，很可能马上用附近地址。
```

比如数组循环：

```c
for (int i = 0; i < 100; i++) {
    a[i] = i;
}
```

访问 `a[0]` 后，很可能继续访问 `a[1]`、`a[2]`。

## 5. RAM 是什么

RAM 是 main memory，主内存。

程序运行时，OS 会把 executable 加载进 RAM，形成 process。

一个 process 在 RAM 里大概是：

```text
process memory
├── text/code segment
├── data segment
├── heap
└── stack
```

## 6. Process memory 四大区域

### 6.1 Text / code segment

放机器码 instructions。

比如 C：

```c
x = x + 1;
```

编译后可能变成：

```text
load
add
store
```

这些 instruction 放在 text/code segment。

重点：

```text
CPU 执行的是 text/code segment 里的 machine code。
```

### 6.2 Data segment

放：

```text
global variables
static variables
string literals
```

比如：

```c
int global_num = 10;
printf("hello\n");
```

大概在：

```text
data segment
├── global_num = 10
└── "hello\n"
```

### 6.3 Heap

heap 放动态分配内存。

常见函数：

```c
malloc()
calloc()
realloc()
free()
```

例子：

```c
int *p = malloc(sizeof(int));
*p = 99;
```

这里：

```text
p 本身是 local variable，通常在 stack；
malloc 出来的 int 在 heap；
p 存的是 heap 那块内存的 address。
```

图：

```text
stack:
    p = 0x1000
          |
          v
heap:
    address 0x1000: 99
```

### 6.4 Stack

stack 放函数调用信息。

常见内容：

```text
local variables
function parameters
return address
saved registers
old frame pointer
```

比如：

```c
void f(int a) {
    int y = 5;
}

int main(void) {
    int x = 3;
    f(x);
}
```

调用 `f(x)` 时：

```text
stack
├── f frame
│   ├── parameter a
│   └── local variable y
└── main frame
    └── local variable x
```

`f` return 后：

```text
stack
└── main frame
    └── local variable x
```

重点：

```text
函数调用时 stack 增长；
函数 return 时 stack 缩小。
```

## 7. Recursion 时 RAM 里发生什么

例子：

```c
void f(int n) {
    if (n == 0) {
        return;
    }

    f(n - 1);
}
```

调用：

```c
f(3);
```

调用链：

```text
f(3)
    -> f(2)
        -> f(1)
            -> f(0)
```

stack 里大概是：

```text
f(0) frame
    n = 0
    return address = 回到 f(1)

f(1) frame
    n = 1
    return address = 回到 f(2)

f(2) frame
    n = 2
    return address = 回到 f(3)

f(3) frame
    n = 3
    return address = 回到 main
```

重点：

```text
每一层 f 都是同一个函数；
但每一层都有自己独立的一份 n。
```

没有 base case 时，stack 会一直增长，最后 stack overflow。

## 8. C、assembly、machine code、executable 的区别

### 8.1 C source code

你写的代码：

```c
int x = 3 + 4;
```

给人看的，CPU 不能直接执行。

### 8.2 Assembly code

更接近 CPU 的文字版指令：

```mips
li  $t0, 3
li  $t1, 4
add $t2, $t0, $t1
```

assembly 是 machine code 的 readable version。

### 8.3 Machine code

CPU 真正执行的二进制 instruction。

例如一条 MIPS instruction 可能类似：

```text
00100001000010010000000000001100
```

### 8.4 Executable

executable 是完整程序文件。

它不只包含 machine code，还包含：

```text
entry point
program metadata
data segment 信息
string literals
global variable 初始值
linking information
debug information
```

所以：

```text
machine code = CPU 要执行的指令内容
executable = 装着 machine code 和运行信息的完整程序文件
```

## 9. Linker 和 runtime

### 9.1 Linker

linker 叫链接器。

你写：

```c
printf("hello\n");
malloc(4);
free(p);
```

但你的 `.c` 文件里没有 `printf`、`malloc`、`free` 的内部实现。

linker 把：

```text
你的 object file
C library
其他 object file
```

连接成 executable。

简单说：

```text
compiler 负责翻译；
linker 负责连接。
```

### 9.2 Runtime

runtime 是程序运行时的启动和收尾支持代码。

真实流程不是直接从 `main` 开始，而是：

```text
OS 启动程序
    ↓
runtime startup code 先运行
    ↓
runtime 准备环境
    ↓
runtime 调用 main
    ↓
main return
    ↓
runtime 收尾
    ↓
程序结束
```

所以：

```text
main 也是被 runtime 调用的函数。
```

## 10. 为什么要 return to caller

函数调用本质上是：

```text
跳到另一个函数执行；
执行完后跳回来。
```

C：

```c
int square(int x) {
    return x * x;
}

int main(void) {
    int y = square(5);
    return 0;
}
```

执行顺序：

```text
main call square
square return 回 main
main return 回 runtime
```

MIPS 里：

```mips
jal square
```

意思是：

```text
跳到 square；
同时把回来位置存进 $ra。
```

函数结束：

```mips
jr $ra
```

意思是：

```text
跳回 caller。
```

看起来像 return 两次，是因为有两层调用：

```text
runtime 调用 main；
main 调用 square。
```

所以：

```text
square return -> main
main return -> runtime
```

## 11. 计算到底在哪里发生

普通算术计算发生在 CPU 的 ALU。

但 ALU 通常对 registers 里的数据计算，不是直接对 RAM 里的变量计算。

C：

```c
int z = x + y;
```

MIPS 思路：

```mips
lw  $t0, x
lw  $t1, y
add $t2, $t0, $t1
sw  $t2, z
```

流程：

```text
RAM 里的 x
    ↓ lw
register $t0

RAM 里的 y
    ↓ lw
register $t1

$t0 + $t1
    ↓ ALU
register $t2

$t2
    ↓ sw
RAM 里的 z
```

重点：

```text
RAM 负责存；
register 负责临时拿着；
ALU 负责算；
instruction 负责告诉 CPU 做什么。
```

## 12. MIPSy 里怎么编程

MIPSy 是 MIPS simulator。

它模拟：

```text
MIPS CPU 如何执行 assembly。
```

常见结构：

```mips
.data
message:
    .asciiz "hello\n"

.text
.globl main

main:
    li  $v0, 4
    la  $a0, message
    syscall

    li  $v0, 0
    jr  $ra
```

### 12.1 `.data`

放数据：

```mips
.data
x:
    .word 10

message:
    .asciiz "hello\n"
```

对应：

```text
global variables
string literals
```

### 12.2 `.text`

放 instructions：

```mips
.text
main:
    li $t0, 3
    li $t1, 4
    add $t2, $t0, $t1
```

### 12.3 `.globl main`

告诉系统：

```text
main 这个 label 可以被找到。
```

### 12.4 `main:`

这是 main function 的入口。

### 12.5 `li $v0, 0`

设置 return value 为 0。

类似 C：

```c
return 0;
```

### 12.6 `jr $ra`

跳回 caller。

因为 `main` 也是被 runtime/startup code 调用的。

## 13. MIPS function call

C：

```c
int f(int x) {
    return x + 1;
}

int main(void) {
    int y = f(5);
    return 0;
}
```

MIPS 思路：

```mips
.text
.globl main

main:
    li  $a0, 5
    jal f

    # f 的 return value 现在在 $v0

    li  $v0, 0
    jr  $ra

f:
    addi $v0, $a0, 1
    jr   $ra
```

调用约定：

```text
$a0-$a3:
    function arguments

$v0:
    return value

jal function:
    call function，并保存 return address 到 $ra

jr $ra:
    return to caller
```

如果一个函数里面还要 call 另一个函数，通常要先保存 `$ra`，因为新的 `jal` 会覆盖 `$ra`。

## 14. MIPS stack frame

如果函数要保存 `$ra`、`$fp` 或 local variables，就会用 stack。

常见开头：

```mips
addi $sp, $sp, -8
sw   $ra, 4($sp)
sw   $fp, 0($sp)
move $fp, $sp
```

常见结尾：

```mips
move $sp, $fp
lw   $fp, 0($sp)
lw   $ra, 4($sp)
addi $sp, $sp, 8
jr   $ra
```

意义：

```text
prologue:
    建立当前函数的 stack frame。

epilogue:
    恢复 caller 的状态，然后 return。
```

## 15. MIPS 常见 instruction 类型

### 算术

```mips
add
addi
sub
mul
div
```

### Load / store

```mips
lw
sw
lb
sb
la
li
```

`lw` / `sw` 用来在 RAM 和 register 之间搬数据。

### Branch / jump

```mips
beq
bne
j
jal
jr
```

这些会改变 program counter。

### Syscall

在 MIPSy 里，输入输出常用 syscall。

打印 integer：

```mips
li $v0, 1
li $a0, 42
syscall
```

打印 string：

```mips
.data
message:
    .asciiz "hello\n"

.text
main:
    li $v0, 4
    la $a0, message
    syscall

    li $v0, 0
    jr $ra
```

## 16. 一个完整小例子

C：

```c
int main(void) {
    int x = 3;
    int y = 4;
    int z = x + y;
    return 0;
}
```

简化 MIPS：

```mips
.text
.globl main

main:
    li  $t0, 3
    li  $t1, 4
    add $t2, $t0, $t1

    li  $v0, 0
    jr  $ra
```

如果放 stack：

```mips
.text
.globl main

main:
    addi $sp, $sp, -12

    li   $t0, 3
    sw   $t0, 0($sp)      # x

    li   $t1, 4
    sw   $t1, 4($sp)      # y

    lw   $t2, 0($sp)      # load x
    lw   $t3, 4($sp)      # load y
    add  $t4, $t2, $t3    # x + y
    sw   $t4, 8($sp)      # z

    addi $sp, $sp, 12

    li   $v0, 0
    jr   $ra
```

这体现了核心流程：

```text
stack/RAM -> register -> ALU -> register -> stack/RAM
```

## 17. 最终压缩版

```text
程序存在 SSD/HDD 上；
运行时被 OS 加载进 RAM；
RAM 里形成 process；
process 有 text/data/heap/stack；
CPU 执行 text segment 里的 machine code；
CPU 用 PC 找下一条 instruction；
数据从 RAM/load 到 register；
ALU 对 register 做计算；
结果 store 回 RAM；
cache 在 CPU 和 RAM 中间自动加速；
MIPS 是一套 CPU 指令规则；
MIPSy 是模拟 MIPS CPU 的工具。
```
