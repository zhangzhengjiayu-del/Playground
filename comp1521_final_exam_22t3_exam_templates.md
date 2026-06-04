# COMP1521 Final 22T3 刷题模板：看到题目时脑子里怎么动

这份是速用版。你刷 past paper 的时候，不要先想“答案是什么”，先想“这题属于哪个模板”。COMP1521 的题很多不是靠灵感，是靠把固定套路写稳。

## Q1 模板：取某几位 bits

题型关键词：

```text
return bits a..b
middle 8 bits
unsigned integer
```

脑内模板：

```text
1. 把目标最低位移到 bit 0
2. mask 掉不需要的高位
```

C 模板：

```c
return (x >> start) & mask;
```

如果要取 8 bits：

```c
mask = 0xFF
```

如果要取 n bits：

```c
mask = (1u << n) - 1
```

但 n 是 32 时不能这样写，因为 `1u << 32` 不安全。

## Q2 模板：MIPS 读数、算术、打印

题型关键词：

```text
reads numbers
prints expression
equivalent to C program
```

脑内模板：

```text
read_int -> move 保存
read_int -> move 保存
计算
print_int
print newline
exit
```

MIPS syscall 速记：

```mips
li   $v0, 5
syscall
move $t0, $v0

li   $v0, 1
move $a0, $t0
syscall

li   $v0, 11
li   $a0, '\n'
syscall

li   $v0, 10
syscall
```

做乘法：

```mips
mul $t2, $t0, $t0
```

## Q3 模板：MIPS while loop

题型关键词：

```text
while
until
read numbers until
sum reaches
```

脑内模板：

```text
init
condition label
    if condition false goto end
body
    ...
    goto condition
end
```

MIPS 模板：

```mips
    li   $t0, 0          # sum

loop_cond:
    bge  $t0, 42, loop_end

    li   $v0, 5
    syscall
    add  $t0, $t0, $v0

    b    loop_cond

loop_end:
    # print sum
```

关键：branch 写的是“什么时候离开 loop”，这样最不容易乱。

## Q4 模板：C 扫描 32 个 bits

题型关键词：

```text
longest sequence of bits
count bits
32-bit unsigned integer
```

脑内模板：

```text
best = 0
current = 0
repeat 32 times:
    if lowest bit is 1:
        current++
        best = max(best, current)
    else:
        current = 0
    x >>= 1
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

## Q5 模板：MIPS 扫描 32 个 bits

题型关键词：

```text
same as previous question
MIPS
bit pattern
```

register 分配建议：

```text
$t0 = x
$t1 = i
$t2 = current
$t3 = best
$t4 = bit
```

脑内模板：

```text
i = 0
while i < 32:
    bit = x & 1
    if bit == 0:
        current = 0
    else:
        current++
        if best < current:
            best = current
    x = logical right shift by 1
    i++
print best
```

关键指令：

```mips
andi $t4, $t0, 1
srl  $t0, $t0, 1
```

提醒：这题处理的是 bit pattern，所以右移用 `srl`。

## Q6 模板：用临时文件删除一行

题型关键词：

```text
delete nth line
modify file
print nothing
temporary file
```

脑内模板：

```text
打开 input
打开 temp output
line = 1
while 读到 char:
    if line != n:
        写 char 到 temp
    if char == '\n':
        line++
关闭
rename temp -> original
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

注意：用 `int c` 接 `fgetc`，不要用 `char c`，因为 EOF 是 int。

## Q7 模板：UTF-8 validator and replacer

题型关键词：

```text
invalid UTF-8
replace with '?'
new string
```

脑内模板：

```text
读一个 byte
判断它需要几个 bytes
检查后续 continuation bytes
合法就 copy
非法就写 '?'
移动 i 到这个 sequence 后面
```

byte 判断模板：

```c
if ((b & 0x80) == 0x00) {
    // 1 byte ASCII
} else if ((b & 0xE0) == 0xC0) {
    // 2 bytes
} else if ((b & 0xF0) == 0xE0) {
    // 3 bytes
} else if ((b & 0xF8) == 0xF0) {
    // 4 bytes
} else {
    // invalid starter or continuation
}
```

continuation 判断：

```c
(b & 0xC0) == 0x80
```

最重要的实现习惯：

```c
unsigned char b = input[i];
```

不要直接用 signed `char` 做 bitwise 判断。

## Q8 模板：MIPS recursive descent parser

题型关键词：

```text
expression
term
value
recursive
global char *s
```

C 结构要背熟：

```text
expression = term, maybe '|' expression
term       = value, maybe '&' term
value      = current char is T, then s++
```

MIPS 函数规则：

```text
返回值放 $v0
调用别的函数前保存 $ra
跨 jal 保留 lhs，要放 stack 或 $s register
```

全局指针 `s` 的访问方式：

```text
s 这个 label 存的是 pointer
先 lw 取 pointer
再 lb 取 *s
```

形状：

```mips
la  $t0, s
lw  $t1, 0($t0)     # $t1 = s
lb  $t2, 0($t1)     # $t2 = *s
addi $t1, $t1, 1    # s++
sw  $t1, 0($t0)
```

如果这题写不完，先确保 `value`、`term`、`expression` 的函数栈结构正确。

## Q9 模板：5 个 pthread 分文件行处理

题型关键词：

```text
create five threads
evenly split work
no global variables
no locks
line by line
fseek
```

脑内模板：

```text
准备 thread_data array[5]
for each thread:
    设置 id、filename、start_line、num_lines
    pthread_create
for each thread:
    pthread_join
    total += returned count
```

thread 做的事：

```text
compute_thread_hello(id)
打开文件
fseek 到自己的起点
读固定数量的行
计算 count
返回 count
```

固定行长题的 offset：

```text
offset = start_line * 10
```

不要犯的错：

```text
不要把同一个局部变量地址传给所有 thread。
```

应该：

```c
struct thread_data data[5];
pthread_create(&threads[i], NULL, worker, &data[i]);
```

## Q10 模板：MIPS 大整数

题型关键词：

```text
arbitrarily large
no floating point
no 32/64-bit only solution
line less than 10000 chars
```

脑内模板：

```text
数字不能放 register，只能放 digit array。
```

大整数存法：

```text
倒序存十进制 digit
123 -> [3, 2, 1], len = 3
```

必须会的子程序：

```text
clear_bigint
copy_bigint
read_number_into_bigint
add_bigint
multiply_bigint
print_bigint
```

加法模板：

```text
carry = 0
for each digit:
    tmp = a[i] + b[i] + carry
    result[i] = tmp % 10
    carry = tmp / 10
```

乘法模板：

```text
result = 0
for i in a:
    for j in b:
        result[i+j] += a[i] * b[j]
normalize carry
```

如果时间不够：

```text
先实现只支持 addition 的版本，拿 partial marks。
```

也就是：

```text
total = 0
反复读 number
total += number
跳过 '+'
最后 print total
```

## 考场检查清单

每道 practical question 写完后问自己：

```text
1. 输出有没有多余文字？
2. newline 对不对？
3. 函数题有没有 print？如果题目说不许 print，就不能 print。
4. MIPS 有没有 exit syscall？
5. MIPS 函数里 jal 之前有没有保存 $ra？
6. C 文件题有没有 fclose？
7. malloc 的 string 有没有 '\0'？
8. bitwise 有没有 unsigned/right shift/mask 搞错？
9. thread 有没有真的创建 5 个？
10. 有没有改了不该改的 provided file？
```

## 你现在应该怎么练

不要一上来刷 Q10。顺序应该是：

```text
Q1 -> Q4 -> Q2 -> Q3 -> Q5 -> Q6 -> Q7 -> Q8 -> Q9 -> Q10
```

原因：

- Q1/Q4 让你快速进入 bitwise；
- Q2/Q3 是 MIPS 基本功；
- Q5 把 bitwise 和 MIPS 合起来；
- Q6/Q7 是 C 的文件和 bytes；
- Q8 开始进入 stack/递归；
- Q9 是 pthread；
- Q10 是终极大题，最后练。

