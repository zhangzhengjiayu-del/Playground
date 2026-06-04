# COMP1521 Final 22T3 知识地图：这 10 题到底在考什么

这份不是“背答案”的文件，而是帮你看懂 final 的出题结构：每一道题表面在问一个小任务，背后其实对应 COMP1521 的一个核心能力。你复习时可以用它检查：我会不会这个知识点？我能不能手写出来？我知道常见坑在哪里吗？

重要提醒：如果是真正在考试期间，closed-book exam 不能用 AI、不能看自己的总结、不能找人帮忙。下面这份只适合平时复习 past paper 用。

## 总览：这张卷子在测什么

这 10 题基本覆盖 COMP1521 的主线：

- Q1、Q4、Q5：bitwise operations，直接操作 32-bit integer。
- Q2、Q3、Q8、Q10：MIPS，把 C 的控制流、函数、递归、大数组操作翻成汇编。
- Q6：file I/O，读文件、写临时文件、替换原文件。
- Q7：UTF-8 encoding，判断 byte sequence 是否合法。
- Q9：threads，用 pthreads 分工，不靠 global variable 和 mutex。

如果用一句话概括 COMP1521 final：

```text
它不是问你“C 怎么写”，而是问你：数据在内存里怎么表示，CPU 怎么一步步执行，操作系统给程序提供了什么能力。
```

## Q1：取出中间 8 个 bits

题目要求：

```text
给一个 uint32_t x，返回 bit 12..19。
```

你需要会的知识：

- bit positions 从右边最低位开始数，最低位是 bit 0；
- 要拿 bit 12..19，先把它们右移到 bit 0..7；
- 再用 mask 只保留最低 8 bits。

核心套路：

```text
先 shift，再 mask。
```

也就是：

```text
x >> 12
```

会把原来的 bit 12 移到 bit 0，bit 19 移到 bit 7。

然后：

```text
& 0xFF
```

只留下最低 8 位。

你必须理解的点：

- `0xFF` 的 binary 是 `11111111`；
- `& 0xFF` 的意思是“只保留最低 8 bits”；
- 因为 `x` 是 `uint32_t`，右移是 logical shift，不会补符号位。

常见坑：

- 写成左移；
- mask 用错，比如 `0xF` 只保留 4 bits；
- 忘记先 shift，直接 `x & 0xFF` 只会拿最低 8 bits。

## Q2：MIPS 读两个数，输出平方和

C 逻辑：

```c
scanf("%d", &a);
scanf("%d", &b);
printf("%d\n", a * a + b * b);
```

你需要会的知识：

- MIPS syscall 读整数；
- register 保存变量；
- `mul` 做乘法；
- `add` 做加法；
- syscall 打印整数和换行。

MIPS 常用 syscall：

```text
$v0 = 5   read_int，结果回到 $v0
$v0 = 1   print_int，要打印的数放 $a0
$v0 = 11  print_char，要打印的字符放 $a0
$v0 = 10  exit
```

这题的思路：

```text
读 a -> 存到某个 $t register
读 b -> 存到另一个 $t register
a * a
b * b
加起来
print int
print newline
exit
```

你必须熟练：

- syscall 会改 `$v0`，所以读完之后要立刻把结果 move 到自己的 register；
- `$t0`、`$t1`、`$t2` 适合 main 里的临时变量；
- newline 可以用 ASCII 10。

## Q3：MIPS while loop，累加到至少 42

C 逻辑：

```c
int sum = 0;
while (sum < 42) {
    int x;
    scanf("%d", &x);
    sum += x;
}
printf("%d\n", sum);
```

你需要会的知识：

- while loop 翻成 label + branch；
- 条件判断 `sum < 42`；
- 每轮读一个整数；
- 累加。

标准翻译套路：

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

MIPS 里可以用：

```mips
bge $t0, 42, loop_end
```

或者如果不能用 pseudo-instruction，就用 `slt` 加 branch。但 COMP1521 里 mipsy 通常允许常见 pseudo-instructions。

常见坑：

- 把条件写反；
- 读完 x 后覆盖了 sum；
- 忘记跳回 loop condition；
- 多打印提示文字，考试题通常要求只输出答案和 newline。

## Q4：C 里找最长连续 1 bit

题目要求：

```text
给 uint32_t x，返回它的 binary 表示里最长一段连续 1 的长度。
```

例子：

```text
1110111100
最长连续 1 是 4
```

你需要会的知识：

- 用 loop 检查 32 个 bits；
- 用 `& 1` 看最低位是不是 1；
- 用 `>> 1` 每次处理下一位；
- 维护 current run 和 best run。

核心思路：

```text
current = 当前连续 1 的长度
best = 目前见过的最长长度

重复 32 次：
    如果当前 bit 是 1：
        current++
        如果 current > best，更新 best
    否则：
        current = 0
    x 右移一位
```

为什么要循环 32 次？

因为 `uint32_t` 固定有 32 bits。即使 x 变成 0，也可以提前停，但循环 32 次最稳。

常见坑：

- 只循环到 `x == 0`，但对 unsigned 通常可以，不过要注意全 0 情况；
- 忘记遇到 0 时把 current 清零；
- 用 signed int 右移，负数会有 sign extension 问题；
- 最后才更新 best，可能漏掉结尾是一串 1 的情况。

## Q5：MIPS 版最长连续 1 bit

这题是 Q4 的 MIPS 版本。

你需要把这个 C 思路翻成 MIPS：

```text
best = 0
current = 0
count = 0

while count < 32:
    if x & 1:
        current++
        best = max(best, current)
    else:
        current = 0
    x = x >> 1
    count++

print best
```

关键 MIPS 指令：

```mips
andi    # 检查 lowest bit
srl     # logical right shift
addi    # +1
bge/blt/beq/bne  # 控制流程
move
```

为什么用 `srl` 而不是 `sra`？

- `srl` 是 logical right shift，左边补 0；
- `sra` 是 arithmetic right shift，负数左边补 1；
- 这题把 input 当作 32-bit bit pattern，所以应该用 logical shift。

这题最重要的坑：

```text
输入 -1 在 bit pattern 上是 0xFFFFFFFF，答案应该是 32。
```

如果你用 arithmetic shift 并且用 `x != 0` 当循环条件，可能会死循环或逻辑错。固定循环 32 次最安全。

## Q6：删除文件第 n 行

题目要求：

```text
程序参数：filename 和 n
删除文件里的第 n 行。
如果文件少于 n 行，就什么都不做。
不输出任何东西。
```

你需要会的知识：

- command line arguments：`argc`, `argv`;
- `atoi` 把字符串转成整数；
- `fopen`, `fgetc`, `fputc`, `fclose`;
- 临时文件；
- `rename` 替换原文件。

为什么建议用临时文件？

因为一边读同一个文件一边写同一个文件很危险：写入会覆盖还没读的数据，文件位置也容易混乱。

安全套路：

```text
打开原文件读
打开临时文件写

line_number = 1
逐字符读取原文件：
    如果当前 line_number 不是 n：
        把字符写进临时文件
    如果字符是 '\n'：
        line_number++

关闭两个文件
用 rename 把临时文件改成原文件名
```

题目说：

```text
Assume a line is zero or more characters followed by '\n'
```

所以你可以放心用 newline 判断行结束。

常见坑：

- 删除第 1 行时 line_number 初值写错；
- 如果 n 超出文件行数，临时文件其实就是原文件副本，rename 回去也没问题；
- 不小心输出 debug 信息，题目要求 stdout/stderr 都不要输出；
- 用 `remove` 或 `rename` 前忘记 `fclose`。

## Q7：替换 invalid UTF-8 sequences

题目要求：

```text
输入一个 UTF-8 string，返回新 string。
合法 UTF-8 保留，非法 sequence 用 '?' 替换。
```

你需要会的知识：

- UTF-8 byte patterns；
- continuation byte；
- C string 是 null-terminated byte array；
- malloc 分配新字符串。

UTF-8 规则：

```text
1 byte:  0xxxxxxx
2 bytes: 110xxxxx 10xxxxxx
3 bytes: 1110xxxx 10xxxxxx 10xxxxxx
4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

判断一个 byte 类型：

```text
0xxxxxxx    ASCII
10xxxxxx    continuation byte
110xxxxx    2-byte starter
1110xxxx    3-byte starter
11110xxx    4-byte starter
其他         invalid starter
```

核心算法：

```text
从左到右扫描 input。

如果是 ASCII：
    copy 1 byte

如果是合法 starter：
    看后面需要的 continuation bytes 是否都存在且形如 10xxxxxx
    如果全部合法：
        copy 整个 sequence
    否则：
        output '?'
        跳过这个损坏 sequence 里已经检查到的部分

如果是单独 continuation byte：
    output '?'
    跳过 1 byte
```

这题最容易丢分的地方在题目这句话：

```text
If a valid starting byte occurs within another UTF-8 sequence,
it should be considered part of that sequence, thus rendering the sequence invalid.
It should not be considered the start of a new sequence.
```

意思是：

如果你看到一个 3-byte starter，后面两个 byte 应该都是 continuation byte。哪怕第二个 byte 看起来像另一个合法 starter，也不能从那里重新开始；整个原 sequence 应该算坏掉，用一个 `?` 替代。

举例：

```text
E7 89 36
```

`E7` 表示应该有 3-byte sequence，`89` 是 continuation，但 `36` 不是 continuation。所以这整个 sequence 变成一个 `?`，不是把 `36` 当作正常字符的一部分倒回去处理。

实现时的实用策略：

- output 最多不会比 input 长，因为非法 sequence 用 1 byte `?` 替换；
- 所以可以 `malloc(strlen(input) + 1)`;
- 用两个 index：`i` 读 input，`j` 写 output。

常见坑：

- 用 `char` 做 bit mask 时受 signed char 影响，最好转成 `unsigned char`;
- 忘记给 output 结尾加 `'\0'`;
- 单独 continuation byte 应该变成 `?`;
- 不完整 sequence，比如字符串结尾是 `F0 9F`，也应变成 `?`。

## Q8：MIPS 递归解析 boolean expression

这题给了一个 C parser：

```c
expression -> term ('|' expression)?
term       -> value ('&' term)?
value      -> 'T' or 'F'
```

你需要会的知识：

- recursive descent parser；
- operator precedence；
- MIPS function call；
- global pointer `s`；
- stack frame 保存 `$ra` 和需要跨函数调用保留的值。

为什么 `&` 优先级比 `|` 高？

因为：

```text
expression 调 term
term 调 value
```

越底层的函数绑定越紧。`term` 先吃掉所有 `&`，`expression` 再处理 `|`。

例子：

```text
F|T&F
```

应该理解成：

```text
F | (T & F)
```

所以结果是 F。

MIPS 需要实现四个函数：

- `main`;
- `expression`;
- `term`;
- `value`;

每个函数返回值放 `$v0`。

`s` 是一个全局变量，存当前读到字符串哪个位置。每次 `value` 读一个字符，就让 `s++`。

函数调用关键：

```mips
jal function_name   # call
jr $ra              # return
```

如果一个函数里面又会调用别的函数，就必须保存 `$ra`，否则 return address 会被覆盖。

典型 prologue/epilogue：

```mips
begin:
    addi $sp, $sp, -8
    sw   $ra, 4($sp)
    sw   $s0, 0($sp)

end:
    lw   $s0, 0($sp)
    lw   $ra, 4($sp)
    addi $sp, $sp, 8
    jr   $ra
```

这题常见坑：

- `expression` 调用 `term` 后，还要保留 lhs，再递归调用 `expression` 得 rhs；
- 如果 lhs 放 `$t0`，递归调用可能覆盖它，所以应保存到 stack 或 `$s0`;
- `s++` 是指针加 1 byte；
- 读当前字符是：先 load `s` 的地址，再 load `s` 里面存的 pointer，再 `lb` 读 char。

## Q9：pthread 并行处理文件

题目要求：

```text
创建 5 个 thread，平均分工处理 2880 行 expression。
不能用 global variables。
不能用 locks/mutexes。
不能把整个文件读进内存。
每个 byte 不应读超过一次。
```

你需要会的知识：

- `pthread_create`;
- `pthread_join`;
- 给 thread 传 struct；
- thread return result；
- `FILE *`, `fopen`, `fseek`, `fgets`;
- 固定长度行的文件分块。

每行 10 bytes，包括 newline。

总共 2880 行，5 个线程，平均分：

```text
2880 / 5 = 576 行每个线程
```

每个线程负责一段：

```text
thread 0: line 0..575
thread 1: line 576..1151
thread 2: line 1152..1727
thread 3: line 1728..2303
thread 4: line 2304..2879
```

对应 byte offset：

```text
start_offset = start_line * 10
```

每个 thread 可以自己打开一次文件：

```text
FILE *fp = fopen(filename, "r");
fseek(fp, start_offset, SEEK_SET);
循环读自己的 576 行
关闭文件
返回 count
```

为什么不需要 mutex？

因为每个 thread 只读自己的文件区域，自己的 count 存在线程本地数据里。最后 main 用 `pthread_join` 收集每个线程的结果，再加起来。

为什么不能用 global？

题目明确禁止。解决方法是用 struct：

```c
struct thread_data {
    char *filename;
    int thread_id;
    int start_line;
    int lines_to_read;
};
```

thread function 里：

```text
compute_thread_hello(thread_id)
处理自己的行
malloc 一个 int 保存结果
return 指针
```

main 里：

```text
pthread_join(thread, &result_pointer)
total += *result_pointer
free(result_pointer)
```

常见坑：

- 忘记每个新线程都必须调用 `compute_thread_hello`;
- 在 loop 里把同一个 local struct 地址传给所有 thread，导致线程看到同一份被改来改去的数据；
- 解决方法：创建长度为 5 的 struct array，每个 thread 用自己的 element；
- 忘记 `-pthreads`，不过 Makefile 通常处理好了；
- 在多个 thread 里共享同一个 `FILE *`，会导致 file position 互相干扰。

## Q10：MIPS 大整数表达式

题目要求：

```text
输入只包含数字、+、*
整数可以非常大，不能放进 32-bit 或 64-bit register。
要精确输出结果。
```

这题是整张卷子最难的题。

你需要会的知识：

- 字符串处理；
- 用数组表示大整数；
- 大整数加法；
- 大整数乘法；
- 表达式解析；
- MIPS memory 操作。

为什么不能直接用 register？

因为输入可能是：

```text
100000000000000000000000000000000000000000000000000000
```

这种数远远超过 32-bit。MIPS register 只能装 32-bit，所以必须自己用数组存每一位数字。

大整数常见表示：

```text
数字 12345
内存里倒着存成：
digits[0] = 5
digits[1] = 4
digits[2] = 3
digits[3] = 2
digits[4] = 1
length = 5
```

为什么倒着存？

因为小学加法和乘法都是从个位开始，倒着存时 index 0 就是个位，carry 更容易处理。

大整数加法：

```text
carry = 0
for i = 0; i < max_len; i++:
    sum = a[i] + b[i] + carry
    result[i] = sum % 10
    carry = sum / 10
如果最后 carry > 0，加到最高位
```

大整数乘法：

```text
result 全部清零
for i in a:
    for j in b:
        result[i + j] += a[i] * b[j]
之后统一处理 carry
```

表达式解析：

题目里虽然有 `+` 和 `*`，但例子暗示它应该按正常优先级：乘法先算，再加法。要处理：

```text
2*100...000+3*4
```

应理解成：

```text
(2 * 100...000) + (3 * 4)
```

所以可以用这种结构：

```text
total = 0
current_product = 1

读一个 number
current_product *= number

遇到 '*':
    继续读下一个 number，乘到 current_product

遇到 '+':
    total += current_product
    current_product = 1
    继续下一项

到行尾:
    total += current_product
    print total
```

注意：如果课程/题目要求 left-to-right，则 parser 会不同。但这题 Q10 的描述是 arithmetic expression with addition and multiply，例子符合乘法优先级。

MIPS 实现时的关键能力：

- `lb` 逐字符读取 input buffer；
- 判断字符是不是 digit；
- 把 ASCII digit 转成数值：`digit = char - '0'`;
- 大整数 array 清零；
- 大整数复制；
- 大整数加法；
- 大整数乘法；
- 输出时从最高位往最低位 print_char。

这题复习策略：

```text
先确保能做“大整数加法”。
再做“大整数乘以小整数”。
再做“大整数乘以大整数”。
最后才接 parser。
```

Partial marks 说明：

```text
只处理正整数和加法也有部分分。
```

所以考试时如果时间不够，优先写：

- 读大整数；
- 大整数加法；
- 输出结果。

不要花太久卡在完整乘法上。

## 你需要掌握的 MIPS 知识清单

### 1. Syscall

```text
read_int, print_int, print_char, read_string, exit
```

你要知道参数放哪里，返回值在哪里。

### 2. Register 用法

```text
$v0     return value / syscall code
$a0-$a3 arguments
$t0-$t9 temporary
$s0-$s7 saved registers
$ra     return address
$sp     stack pointer
```

### 3. Control flow

你要能把：

```c
if
if/else
while
for
```

翻成：

```text
label
branch
jump
```

### 4. Function call

只要函数里会 `jal` 其他函数，就要认真保存 `$ra`。

如果有值要跨函数调用保留：

- 放 `$s` register 并保存/恢复；
- 或者压到 stack。

### 5. Memory

你要会：

```mips
lb / sb      byte
lw / sw      word
la           load address
```

字符串、大整数、buffer 都靠 byte-level memory 操作。

## 你需要掌握的 C 知识清单

### 1. Bitwise

```c
&, |, ^, ~, <<, >>
```

尤其是：

```text
取某一段 bits = shift + mask
看最低位 = x & 1
```

### 2. Files

```c
fopen
fclose
fgetc
fputc
fgets
rename
fseek
```

### 3. Strings and bytes

UTF-8 题不是在考“字符”，是在考 byte sequence。

你要敢于把 `char *` 当作：

```text
一串 bytes，直到 '\0' 结束
```

### 4. malloc

如果函数要 return 一个新 string，就不能返回 local array。

错误：

```c
char output[1000];
return output;
```

因为函数结束后 local array 就没了。

正确方向：

```c
char *output = malloc(...);
return output;
```

### 5. pthreads

你要知道：

```c
pthread_create
pthread_join
```

thread function 的形状通常是：

```c
void *thread_function(void *arg)
```

传进去的是 `void *`，出来的也是 `void *`，所以需要 cast。

## 最后复习路线

如果你现在时间紧，按这个顺序复习：

1. Bitwise：Q1、Q4、Q5。
2. MIPS 基础 syscall + loop：Q2、Q3。
3. C file I/O：Q6。
4. UTF-8 byte pattern：Q7。
5. MIPS function + stack + recursion：Q8。
6. pthreads：Q9。
7. MIPS 大整数：Q10。

如果只能救分，优先保：

- Q1：很短，必拿；
- Q2：MIPS 基础，必拿；
- Q3：while loop，常规题；
- Q4：C bit loop；
- Q6：文件题套路固定；
- Q7：至少能处理 ASCII、单独 continuation、不完整 sequence；
- Q10：至少写大整数加法拿 partial。

真正的 COMP1521 final 不是要你变成机器，而是要你能站在机器旁边看懂它在干什么：一个 bit 怎么被解释，一个函数怎么 return，一个文件怎么被系统调用改写，一个字符怎么变成 bytes，一个 thread 怎么和其他 thread 分工。

