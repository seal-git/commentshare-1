def counting_sort(A,k):
    n=len(A)
    B=[0]*(n+1)
    C=[0]*(k+1)
    for j in range(n):
        C[A[j]]=C[A[j]]+1
    for i in range(1,k+1):
        C[i]=C[i]+C[i-1]
    for j in range(n-1,-1,-1):
        B[C[A[j]]]=A[j]
        C[A[j]]=C[A[j]]-1
    B.pop(0)
    print(*B)

n=int(input())
A=list(map(int,input().split()))
counting_sort(A,max(A))

