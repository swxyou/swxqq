package servlet;

import java.util.Arrays;
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] num = new int[5];
        for (int i = 0; i < 5; i++) {
            System.out.println("请输入第" + (i+1) + "个数字");
            num[i] = input.nextInt();
        }
        Arrays.sort(num);
        for (int i = 0; i <num.length ; i++) {
            System.out.println("第"+(i+1)+"个数字为:"+num[i]);
        }
    }
}
