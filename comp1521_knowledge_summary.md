# COMP1521 知识点总览

来源：桌面 `comp1521` 文件夹内的 11 份 notes PDF。

COMP1521 的核心不是“做应用”，而是理解 C 程序在机器和操作系统层面到底怎样运行。课程主线可以概括为：

> C 代码如何变成 MIPS 指令，数据如何以 bit/byte 形式存储，程序如何通过文件、进程和线程与操作系统交互。

## 1. MIPS Basics

这一部分讲 MIPS 汇编语言的基础。

需要掌握：

- MIPS 是一种 RISC 指令集，指令简单、格式规整。
- 汇编程序由 `.data` 和 `.text` 等区域组成。
- 寄存器是 CPU 中极快的小存储空间，例如 `$t0`、`$t1`、`$a0`、`$v0`、`$ra`、`$sp`。
- 常见算术指令：`add`、`sub`、`mul`、`div`、`rem`。
- 常见数据移动指令：`li`、`la`、`move`。
- 系统调用 `syscall` 用来和模拟器/操作系统交互，比如打印整数、打印字符串、读取输入、退出程序。

重点理解：

- C 语言中的变量在汇编中通常会被放进寄存器或内存。
- 一条 C 语句可能对应多条 MIPS 指令。
- 汇编代码更接近机器实际执行的步骤，所以需要自己管理数据、跳转和函数调用细节。

常见能力：

- 把简单 C 表达式翻译成 MIPS。
- 读懂 MIPS 中寄存器的值如何变化。
- 使用 syscall 完成输入输出。

## 2. MIPS Control

这一部分讲 MIPS 中的控制流，也就是 `if`、`while`、`for` 等结构如何在底层实现。

需要掌握：

- 条件分支指令：`beq`、`bne`、`blt`、`ble`、`bgt`、`bge` 等。
- 无条件跳转：`j`。
- 标签 label 的作用：作为跳转目标。
- C 中的 `if/else`、`while`、`for` 在 MIPS 中通常由比较、分支和跳转组成。

重点理解：

- 汇编没有真正的 `if` 或 `while` 语法，本质都是“条件成立就跳到某个 label”。
- 循环通常由三个部分组成：初始化、条件检查、循环体、更新与跳回。
- 分支逻辑写反是常见错误，比如本来要在条件不满足时退出循环，却写成满足时退出。

常见能力：

- 把 C 的条件语句和循环翻译成 MIPS。
- 根据 MIPS label 和 branch 判断程序执行路径。
- 修复循环边界错误和跳转错误。

## 3. MIPS Data

这一部分讲数据在 MIPS 内存中如何存放和读取。

需要掌握：

- `.data` 段用于存储全局数据，例如字符串、数组、整数。
- 常见声明：`.word`、`.byte`、`.asciiz`、`.space`。
- 地址和指针的概念：变量名本质上对应某个内存地址。
- load/store 指令：
  - `lw` / `sw`：读取或写入 word，通常是 4 bytes。
  - `lb` / `sb`：读取或写入 byte。
  - `lh` / `sh`：读取或写入 halfword。
- 数组访问需要计算地址：`base_address + index * element_size`。
- 字符串通常是以 null byte `\0` 结尾的 byte array。

重点理解：

- MIPS 指令不能直接对内存做复杂计算，通常要先 `load` 到寄存器，计算后再 `store` 回内存。
- `int` 数组每个元素通常占 4 bytes，所以索引要乘以 4。
- `char` 数组每个元素占 1 byte，所以索引不需要乘以 4。
- 对齐 alignment 很重要；word 通常要放在 4-byte 对齐地址上。

常见能力：

- 翻译 C 数组、字符串、结构化数据访问。
- 正确区分地址和值。
- 写 MIPS 代码遍历数组或字符串。

## 4. MIPS Functions

这一部分讲函数调用在汇编中如何实现。

需要掌握：

- `jal function`：jump and link，跳转到函数并把返回地址保存到 `$ra`。
- `jr $ra`：函数结束后跳回调用者。
- 参数寄存器：`$a0` 到 `$a3`。
- 返回值寄存器：`$v0`。
- 栈指针 `$sp` 和栈帧 stack frame。
- 保存寄存器：
  - caller-saved：调用者需要自己保护的寄存器。
  - callee-saved：被调用函数需要保存并恢复的寄存器。
- 递归函数需要特别依赖栈保存返回地址、参数和局部状态。

重点理解：

- 函数调用不是魔法，本质是跳转、保存返回地址、传参数、返回值。
- 如果一个函数内部又调用另一个函数，通常要先保存 `$ra`，否则返回地址会被覆盖。
- 栈向低地址增长，push 通常是 `$sp` 减小，pop 是 `$sp` 增大。

常见能力：

- 把 C 函数翻译成 MIPS。
- 写遵守 calling convention 的函数。
- 调试 `$ra`、`$sp`、参数和返回值相关错误。

## 5. Integers

这一部分讲整数在计算机中如何表示。

需要掌握：

- 二进制、十进制、十六进制之间转换。
- byte、word、bit 的关系。
- unsigned integer 和 signed integer 的区别。
- two's complement 补码表示负数。
- 整数范围由 bit 数决定，例如 8-bit unsigned 是 0 到 255，8-bit signed 是 -128 到 127。
- overflow 溢出：结果超出可表示范围。

重点理解：

- 同一串 bits 可以被解释成不同含义，例如 signed int、unsigned int、float、ASCII 字符串。
- 补码的好处是加减法可以使用同一套硬件逻辑。
- C 中 signed overflow 通常是危险的；unsigned overflow 按模运算回绕。

常见能力：

- 判断二进制补码对应的整数。
- 解释为什么整数会溢出。
- 预测类型转换、截断、符号扩展的结果。

## 6. Bitwise Operations

这一部分讲位运算，即直接操作整数的每一位。

需要掌握：

- C 的位运算符：
  - `&`：按位与，用于检查或清零某些 bit。
  - `|`：按位或，用于设置某些 bit。
  - `^`：按位异或，用于翻转或比较 bit。
  - `~`：按位取反。
  - `<<`：左移。
  - `>>`：右移。
- mask 掩码的概念。
- 检查某一位：`x & (1 << n)`。
- 设置某一位：`x | (1 << n)`。
- 清除某一位：`x & ~(1 << n)`。
- 翻转某一位：`x ^ (1 << n)`。
- MIPS 中相关指令：`and`、`or`、`xor`、`nor`、`andi`、`ori`、`xori`、`sll`、`srl`、`sra`。

重点理解：

- 位运算通常用于底层数据处理、编码、权限位、压缩表示和硬件接口。
- 左移常相当于乘以 2 的幂，但要注意溢出。
- 右移 signed 负数在 C 中可能有实现相关行为，因此需要小心。
- 可读性很重要；不是所有 `% 2` 都应该手写成 `& 1`。

常见能力：

- 写 mask 操作。
- 读懂十六进制与二进制 bit pattern。
- 用 bitwise 实现 packed data 的提取和修改。

## 7. Floating Point

这一部分讲浮点数表示。

需要掌握：

- 浮点数用于表示小数和很大/很小的数。
- IEEE 754 表示通常包含：
  - sign 符号位。
  - exponent 指数。
  - fraction/significand 尾数。
- single precision 通常是 32-bit，double precision 通常是 64-bit。
- 特殊值：`+0`、`-0`、`Infinity`、`NaN`。
- 舍入误差 rounding error。
- 很多十进制小数无法用二进制精确表示，例如 0.1。

重点理解：

- 浮点数不是精确实数，而是有限 bit 下的近似。
- 不能随便用 `==` 比较浮点计算结果。
- 浮点数范围大，但精度有限；整数越大，相邻可表示数之间间隔越大。

常见能力：

- 解释浮点误差来源。
- 理解为什么 `0.1 + 0.2` 可能不等于 `0.3`。
- 判断什么时候应该用误差范围 epsilon 比较。

## 8. Files

这一部分讲文件和低层 I/O。

需要掌握：

- 文件是操作系统提供的抽象，本质是 byte stream 或数据集合。
- file descriptor 文件描述符：
  - `0`：standard input。
  - `1`：standard output。
  - `2`：standard error。
- 常见系统调用/函数：
  - `open`：打开文件。
  - `read`：读取 bytes。
  - `write`：写入 bytes。
  - `close`：关闭文件。
  - `lseek`：移动文件 offset。
- 文件权限、打开模式、错误返回值。
- 文本文件和二进制文件的区别主要在“如何解释 bytes”。

重点理解：

- `read` 和 `write` 处理的是 bytes，不会自动理解字符串、整数或结构。
- 一次 `read` 不保证读满想要的字节数。
- 文件 offset 会随着读取/写入移动。
- 错误处理很重要，系统调用失败通常返回 `-1` 并设置错误信息。

常见能力：

- 写 C 程序复制文件、统计文件内容、处理二进制数据。
- 理解 command line arguments 和标准输入输出重定向。
- 调试忘记 close、读写长度错误、buffer 越界等问题。

## 9. Unicode

这一部分讲字符编码。

需要掌握：

- ASCII 是早期 7-bit 字符编码，只能覆盖有限英文字符。
- Unicode 是字符集合，目标是表示世界上各种文字和符号。
- UTF-8 是 Unicode 的一种变长编码。
- UTF-8 中一个字符可能占 1 到 4 bytes。
- C 字符串本质是 bytes 加 `\0`，不自动理解“字符数量”。

重点理解：

- character 和 byte 不是同一个概念。
- `strlen` 统计的是 null-terminated string 的 byte 数，不是人眼看到的字符数。
- ASCII 字符在 UTF-8 中仍然是 1 byte，这保证了兼容性。
- 处理非英文文本时，按 byte 切割可能会破坏 UTF-8 字符。

常见能力：

- 判断 UTF-8 字符占几个 bytes。
- 解释为什么中文字符串长度和字符数量不同。
- 写程序遍历 UTF-8 byte sequence。

## 10. Processes

这一部分讲进程，也就是运行中的程序。

需要掌握：

- process 是正在运行的程序实例。
- 每个进程有自己的地址空间、寄存器状态、打开的文件描述符等。
- `fork` 创建子进程。
- `exec` 系列函数用新程序替换当前进程映像。
- `wait` / `waitpid` 等待子进程结束并获取退出状态。
- exit status 用于表示程序是否成功结束。
- parent process 和 child process 的关系。

重点理解：

- `fork` 之后会有两个进程继续从同一位置执行，但返回值不同。
- 子进程通常继承父进程的文件描述符。
- `exec` 成功后不会返回原来的程序。
- 如果父进程不 wait，可能出现 zombie process。

常见能力：

- 预测 `fork` 后会打印几次。
- 写程序创建子进程运行另一个命令。
- 用 `wait` 正确回收子进程。

## 11. Threads

这一部分讲线程和并发。

需要掌握：

- thread 是进程内部的执行流。
- 同一进程内的多个线程共享地址空间和全局数据。
- 线程比进程更轻量，但共享内存会带来竞态问题。
- pthread 基础：
  - `pthread_create`
  - `pthread_join`
  - mutex lock/unlock
- race condition 竞态条件。
- critical section 临界区。
- deadlock 死锁。

重点理解：

- 多线程程序的执行顺序不固定，所以 bug 可能时有时无。
- 对共享变量的读改写不是天然原子的。
- mutex 用来保护共享状态，让同一时间只有一个线程进入临界区。
- 加锁顺序不当可能导致死锁。

常见能力：

- 找出共享变量导致的 race condition。
- 用 mutex 修复并发错误。
- 判断线程程序可能的输出。

## 课程整体复习路线

建议按这条线理解：

1. 先学整数、bit、byte：理解机器只存 bits。
2. 再学 MIPS：理解 C 的变量、循环、数组、函数在底层怎么执行。
3. 再学 floating point 和 Unicode：理解不同数据类型如何解释同一批 bytes。
4. 最后学 files、processes、threads：理解程序如何和操作系统交互。

## 最容易混淆的点

- 地址和值：`la` 加载地址，`lw` 加载地址里的值。
- byte 数和元素数：`int` 数组索引通常要乘以 4。
- signed 和 unsigned：同一 bit pattern 解释结果不同。
- 字符数和 byte 数：UTF-8 中一个字符可能多个 bytes。
- process 和 thread：进程通常不共享地址空间，线程共享地址空间。
- `fork` 和 `exec`：`fork` 复制进程，`exec` 替换当前程序。
- race condition：代码看起来对，但并发执行顺序会让结果错。

## 一句话总结

COMP1521 让你从 C 程序员变成能看懂底层执行的人：你会理解数据如何编码、汇编如何执行、内存如何访问，以及程序如何通过文件、进程和线程使用操作系统。
