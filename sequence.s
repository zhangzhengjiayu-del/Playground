# Read three numbers `start`, `stop`, `step`
# Print the integers bwtween `start` and `stop` moving in increments of size `step`
#
# Before starting work on this task, make sure you set your tab-width to 8!
# It is also suggested to indent with tabs only.
#
# YOUR-NAME-HERE, DD/MM/YYYY

#![tabsize(8)]

main:				# int main(void)
	la	$a0, prompt1	# printf("Enter the starting number: ");
	li	$v0, 4
	syscall

	li	$v0, 5		# scanf("%d", start);
	syscall
	move	$t0, $v0

	la	$a0, prompt2	# printf("Enter the stopping number: ");
	li	$v0, 4
	syscall

	li	$v0, 5		# scanf("%d", stop);
	syscall
	move	$t1, $v0

	la	$a0, prompt3	# printf("Enter the step size: ");
	li	$v0, 4
	syscall

	li	$v0, 5		# scanf("%d", step);
	syscall
	move	$t2, $v0

	blt	$t1, $t0, down_if
	bgt	$t1, $t0, up_if
	b	end

down_if:
	bge	$t2, 0, end
	move	$t3, $t0	# i = start;

down_loop:
	blt	$t3, $t1, end	# while (i >= stop) {

	move	$a0, $t3	# printf("%d", i);
	li	$v0, 1
	syscall

	li	$a0, '\n'
	li	$v0, 11
	syscall

	add	$t3, $t3, $t2	# i += step;
	b	down_loop

up_if:
	ble	$t2, 0, end
	move	$t3, $t0	# i = start;

up_loop:
	bgt	$t3, $t1, end	# while (i <= stop) {

	move	$a0, $t3	# printf("%d", i);
	li	$v0, 1
	syscall

	li	$a0, '\n'
	li	$v0, 11
	syscall

	add	$t3, $t3, $t2	# i += step;
	b	up_loop

end:
	li	$v0, 0
	jr	$ra		# return 0

	.data
prompt1:
	.asciiz "Enter the starting number: "
prompt2:
	.asciiz "Enter the stopping number: "
prompt3:
	.asciiz "Enter the step size: "
