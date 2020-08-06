N=int(input())
souba=list(map(int,input().split()))
urikaiba=list()
money=1000
num=0
for i in range(1,N-1):
    if (souba[i]-souba[i-1])*(souba[i+1]-souba[i])<=0 and ((souba[i]-souba[i-1])!=0 or (souba[i+1]-souba[i])!=0) and (souba[i]-souba[i-1])!=0:
        urikaiba.append(souba[i])
urikaiba.insert(0,souba[0])
urikaiba.append(souba[N-1])
for i in range(len(urikaiba)-1):
    if urikaiba[i+1]-urikaiba[i]>0:
        num=money//urikaiba[i]
        money=money-num*urikaiba[i]
    elif urikaiba[i+1]-urikaiba[i]<0:
        money=money+num*souba[i]
        num=0
if num==0:
    print(money)
else:
    print(money+num*souba[N-1])



