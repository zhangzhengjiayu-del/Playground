# Read a number and print positive multiples of 7 or 11 < n
#
# Before starting work on this task, make sure you set your tab-width to 8!
# It is also suggested to indent with tabs only.
#
# YOUR-NAME-HERE, DD/MM/YYYY

#![tabsize(8)]

main:				# int main(void) {

	la	$a0, prompt	# printf("Enter a number: ");
	li	$v0, 4
	syscall

	li	$v0, 5		# scanf("%d", number);
	syscall
	move	$t0, $v0

	li	$t1, 1		# i = 1;

loop:
	bge	$t1, $t0, end	# while (i < number) {

	rem	$t2, $t1, 7
	beq	$t2, 0, print_i

	rem	$t2, $t1, 11
	beq	$t2, 0, print_i

	b	next

print_i:
	move	$a0, $t1	# printf("%d", i);
	li	$v0, 1
	syscall

	li	$a0, '\n'	# printf("%c", '\n');
	li	$v0, 11
	syscall

next:
	addi	$t1, $t1, 1	# i = i + 1;
	b	loop

end:
	li	$v0, 0
	jr	$ra		# return 0

	.data
prompt:
	.asciiz "Enter a number: "
