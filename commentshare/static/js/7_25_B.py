card_list=list(map(int,input().split()))
num=int(input())
act=0
while card_list[1]<=card_list[0]:
    card_list[1]=card_list[1]*2
    act=act+1
while card_list[2]<=card_list[1]:
    card_list[2]=card_list[2]*2
    act=act+1

if act<=num:
    print('Yes')
else:
    print('No')

