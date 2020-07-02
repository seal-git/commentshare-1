import numpy as np
def whichmax(n1,n2,n3):
    if max(n1,n2,n3)==n1:
        return 1
    elif max(n1,n2,n3)==n2:
        return 2
    else:
        return 3
        
def alighment(a1,a2,match,mismatch,gapscore):
    a_table=np.zeros((len(a1),len(a2)))
    for i in range(len(a1)):
        a_table[i][0]=i*gapscore
    for i in range(len(a2)):
        a_table[0][i]=i*gapscore
    for i in range(len(a1)-1):
        for m in range(len(a2)-1):
            if a1[i]==a2[m]:
                    score=match
            else:
                score=mismatch
            a_table[i+1][m+1]=max(a_table[i][m]+score,a_table[i+1][m]+gapscore,a_table[i][m+1]+gapscore)
    print(a_table)
    b_table=np.empty((len(a1),len(a2)), dtype=str)
    for i in range(1,len(a1)):
        ｂ_table[i][0]='↑'
    for i in range(1,len(a2)):
        ｂ_table[0][i]='←'
    for i in range(1,len(a1))[::-1]:
        for m in range(1,len(a2))[::-1]:
            select = whichmax(a_table[i-1][m-1],a_table[i][m-1],a_table[i-1][m])
            if select==1:
                b_table[i][m]='↖'
            if select==2:
                b_table[i][m]='←'
            if select==3:
                b_table[i][m]='↑'
    print(b_table)
    
s1='CGATAGTTA'
s2='AGTAGCTTC'
alighment(s1,s2,5,-2,-6)
    
    
    