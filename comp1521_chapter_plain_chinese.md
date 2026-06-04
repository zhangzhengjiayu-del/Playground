# COMP1521 章节纯中文导览：每章到底在干什么

这份文件不是完整公式/代码笔记，而是帮你先建立地图：每一章在问什么、为什么要学、学完应该能做什么。顺序按你给的 PDF 列表来。

## 1. Bitwise Operations：把数字拆成一位一位的 bit 来操作

这一章想让你明白：电脑里的数据本质上都是 bit，同一串 bit 可以被解释成不同东西。

比如一个 byte：

```text
10100011
```

它可以是无符号整数 163，也可以是有符号整数 -93，也可以是某种字符编码的一部分。bit 本身没有“意义”，意义来自你怎么解释它。

这一章学的就是怎么直接操作 bit：

- `&`：把某些 bit 筛出来，或清零。
- `|`：把某些 bit 设成 1。
- `^`：不同则为 1，常用于翻转 bit 或比较差异。
- `~`：每一位取反。
- `<<`：左移，常相当于乘 2 的幂。
- `>>`：右移，常相当于除 2 的幂，但负数右移要小心。

它真正想训练的是 mask 思维：

```text
我只关心某几位，所以先做一个 mask，再 & 出来。
```

你学完应该会：

- 判断某一位是不是 1；
- 设置某一位；
- 清除某一位；
- 提取一段 bit；
- 用一个整数表示一个集合；
- 避免 shift 的 undefined behaviour。

## 2. Files：程序怎么通过操作系统读写文件

这一章不是单纯讲“怎么 fopen”。它真正想讲的是：用户程序不能直接碰硬件，必须通过操作系统。

操作系统夹在程序和硬件之间：

```text
你的程序 -> system call -> operating system -> hardware/file system
```

文件在 Unix/Linux 里本质上被当作 byte stream。你用 file descriptor 这个小整数来代表“我打开的某个文件”。

底层系统调用包括：

- `open`：打开文件，得到 file descriptor。
- `read`：从 file descriptor 读 bytes。
- `write`：写 bytes。
- `close`：关闭。
- `lseek`：改变当前读写位置。
- `stat`：看文件 metadata。

上层 C library 包装包括：

- `fopen`
- `fgetc`
- `fputc`
- `fgets`
- `fprintf`
- `fread`
- `fwrite`
- `fclose`

这一章还讲：

- stdin/stdout/stderr；
- buffering 为什么让 `fgetc` 看似一 byte 一 byte 读但不一定慢；
- path、current working directory；
- inode、directory；
- permissions；
- hard link 和 symbolic link；
- `chmod`、`stat`、`opendir/readdir`。

你学完应该知道：文件不是“神秘对象”，它在系统层面就是一串 bytes，加上一堆 metadata。

## 3. Floating Point：小数为什么不可靠

这一章讲浮点数，也就是电脑怎么近似表示实数。

C 里有：

- `float`：通常 32-bit。
- `double`：通常 64-bit。
- `long double`：更大，但平台相关。

核心问题是：实数无限多，但电脑 bit 有限，所以大多数小数不能被精确表示。

比如：

```text
0.1
```

在二进制里可能是无限循环，电脑只能存一个近似值。

IEEE 754 浮点数大致分三块：

```text
sign + exponent + fraction
```

意思类似科学计数法：

```text
正负号 * 有效数字 * 2 的指数
```

这一章想让你理解：

- 为什么 `double` 范围很大但不是无限精确；
- 为什么越大的数之间间隔越大；
- 为什么不要用 `==` 比较浮点数；
- 什么是 infinity；
- 什么是 NaN；
- 为什么某些大整数不能被 double 精确表示。

一句话：浮点数是很聪明的近似，不是真实数学里的实数。

## 4. Integers：整数在电脑里怎么表示

这一章讲整数、进制和 two's complement。

先从进制开始：

- 十进制 base 10。
- 二进制 base 2。
- 十六进制 base 16。
- 八进制 base 8。

电脑用二进制，因为硬件很容易表示高/低电压，也就是 1/0。人类读二进制太痛苦，所以常用十六进制。一个 hex digit 正好对应 4 bits。

有符号整数通常用 two's complement 表示。

核心好处是：加法硬件可以用同一套规则处理正数和负数。

你要记：

- unsigned 只表示非负数；
- signed 可以表示负数；
- n bits 的 unsigned 范围是 `0` 到 `2^n - 1`；
- n bits 的 signed two's complement 范围是 `-2^(n-1)` 到 `2^(n-1)-1`；
- `sizeof` 给 bytes，不是 bits；
- `stdint.h` 提供固定大小整数，比如 `int32_t`、`uint64_t`；
- `EOF` 是 `-1`，所以 `getchar()` 的返回值应该用 `int` 接，不要用 `char`。

这一章本质是在说：整数不是抽象数学整数，它有固定 bit 数、固定范围、会 overflow。

## 5. MIPS Basics：CPU 指令和 register 的基本模型

这一章是 MIPS 的基础版地图。

它想让你知道：

- 为什么学 assembly；
- CPU 大概有哪些部件；
- MIPS 指令是 32-bit bit pattern；
- register 是 CPU 内部的高速小存储；
- MIPS 用 register 做计算；
- memory 和 register 之间要靠 load/store；
- arithmetic、branch、load/store、syscall 是主要指令类型。

你要建立的基本模型：

```text
memory 里放很多 bytes
register 里放当前要算的数据
CPU 指令操作 register
需要读写 memory 时用 load/store
```

重要 register：

- `$t0-$t9`：临时寄存器；
- `$a0-$a3`：函数参数；
- `$v0`：返回值或 syscall number；
- `$ra`：return address；
- `$sp`：stack pointer；
- `$zero`：永远是 0。

这一章是后面所有 MIPS 内容的地基。

## 6. MIPS Control：把 if、while、for 翻成 branch

这一章解决的问题是：MIPS 程序怎么不按顺序执行？

C 里你写：

```c
if (...)
while (...)
for (...)
```

MIPS 里没有高级结构，只有：

```text
比较
跳转到 label
```

所以要先把 C 改写成 simplified C：

```c
if (condition) goto label;
```

再翻成 MIPS branch。

常见技巧：

- if 常用相反条件跳过 body；
- `&&`：任何一个条件失败就去 else；
- `||`：任何一个条件成功就进 if；
- loop 固定结构：init、condition、body、step、jump back、end。

你学完应该能把简单 C 控制流翻译成 MIPS。

## 7. MIPS Data：数组、字符串、struct 在内存里长什么样

这一章把 MIPS 从“register 算数”推进到“真实数据结构”。

核心句：

```text
内存是一大串 byte，C 的数组、struct、字符串都要落到这串 byte 上。
```

MIPS 是 load/store architecture：

- `lb/lbu`：读 1 byte；
- `lh/lhu`：读 2 bytes；
- `lw`：读 4 bytes；
- `sb`：写 1 byte；
- `sh`：写 2 bytes；
- `sw`：写 4 bytes。

数据定义用：

- `.data`
- `.word`
- `.half`
- `.byte`
- `.space`
- `.align`

数组的重点是算地址：

```text
array[i] 的地址 = base + i * sizeof(element)
```

二维数组：

```text
array[row][col] = base + (row * number_of_columns + col) * sizeof(element)
```

struct 的重点是 offset：

```text
field 不靠名字访问，靠离 struct 起点多少 byte 的 offset 访问。
```

这一章还强调 alignment 和 padding：有些类型必须放在特定倍数的地址上，不然 load/store 会失败或低效。

## 8. MIPS Functions：函数调用、$ra 和 stack

这一章讲 C 函数在 MIPS 里怎么实现。

C 函数调用看起来简单：

```c
answer();
timesTwo(4);
```

MIPS 里要处理：

- 参数放哪里；
- 返回值放哪里；
- 跳到函数后怎么回来；
- 如果函数里又调用函数，`$ra` 怎么保护；
- local variables 和 saved registers 放在哪里。

核心指令：

- `jal function`：jump and link，跳去函数，同时把返回地址放进 `$ra`；
- `jr $ra`：跳回调用者。

调用约定：

- `$a0-$a3` 放前四个参数；
- `$v0` 放返回值；
- `$ra` 放返回地址；
- `$sp` 指向 stack；
- `$s0-$s7` 如果被函数用，函数要负责保存和恢复；
- `$t0-$t9` 调用后不能假设还保留原值。

最关键的坑：

```text
如果一个函数会调用另一个函数，它必须保存 $ra。
```

否则 nested call 会覆盖 return address，函数回不去。

## 9. Processes：一个正在运行的程序是什么

这一章从单个程序内部跳到操作系统层面。

Process 是：

```text
一个正在运行的程序，以及它的运行环境。
```

一个 process 有：

- PID；
- parent process；
- CPU registers；
- memory；
- open files；
- environment variables；
- 当前工作目录；
- exit status。

操作系统负责：

- 创建 process；
- 结束 process；
- 切换 process；
- 调度 CPU；
- 管理 parent/child 关系。

重要 API：

- `getpid`、`getppid`；
- `getenv`、`setenv`；
- `exec`：用另一个程序替换当前进程；
- `fork`：复制当前进程，旧式且容易出 bug；
- `posix_spawn`：现代推荐创建新进程；
- `waitpid`：等 child process；
- `exit`；
- `pipe`：进程之间传 byte stream。

这一章的核心是：shell 里你每运行一个命令，背后基本都在创建和管理 process。

## 10. Threads：同一个进程里的多条执行线

这一章讲 concurrency、parallelism 和 threads。

先分清：

- concurrency：多个任务时间上交错，不一定同时；
- parallelism：多个任务真的同时执行。

Process 可以并行，但 process 之间地址空间分离，比较安全，也比较重。

Thread 是同一个 process 里的多条执行线：

- 每个 thread 有自己的 registers 和 stack；
- threads 共享 code、global/static variables、heap、file descriptors；
- 所以通信快，但也容易互相踩数据。

pthreads 常用：

- `pthread_create`：创建线程；
- `pthread_join`：等待线程结束；
- `pthread_exit`：结束当前线程。

最大问题是 data race：

```text
两个线程同时改同一个 global variable，结果可能丢失。
```

解决方法：

- mutex：保护 critical section；
- atomics：使用硬件保证不可分割的操作。

但 mutex 也会带来 deadlock。最常见避免规则：所有线程按同一顺序拿锁。

## 11. Unicode：文字怎么变成 bytes

这一章讲文本编码。

电脑只存 bytes，但人类要存文字。所以需要 character encoding：

```text
字符 -> 编号 -> bytes
```

历史上有很多编码方案，比如 Morse code、ASCII、Extended ASCII、EBCDIC，最后现代系统主要用 Unicode。

ASCII 只能表达很小一部分字符，偏英语世界。Unicode 的目标是给全世界文字、符号、emoji 一个统一编号空间。

关键区分：

- Unicode code point：字符的编号，比如 `U+0041`；
- UTF-8：把 code point 存成 bytes 的一种编码方式；
- UTF-16、UTF-32：其他编码方式。

UTF-8 的重点：

- ASCII 字符仍然用 1 byte；
- 常用非 ASCII 字符用多个 bytes；
- 一个“字符”不一定等于一个 byte；
- 一个用户眼里的字符甚至可能由多个 code points 组合。

这一章真正想让你记住：

```text
不存在“纯文本”这种不用编码的东西。只要是文本，就一定有编码。
```

