1. git rebase,git merge  
   
   rebase：当前分支的commit放到公共分支的最后面，类似于从公共分支又重新拉出该分支；merge会把公共分支和当前的commit提交合并在一起，并形成一个新的commit。

   使用基本原则：
   - 下游分支更新上游分支内容的时候根据情况使用merge或rebase  
    下游分支更新上游分支内容时，若使用rebase之后使用git push,必须使用--force，因为当前分支已变基；若使用merge更新上游分支的内容，会多一条commit
   - 上游分支合并下游分支内容的时候使用 merge(因为下游分支都是基于上游分支开发的，所以上游分支使用merge)
   - 更新当前分支的内容时一定要使用 --rebase 参数(pull会多一条提交记录，会影响历史提交线)

2. webpack的构建流程
3. 如何使用webpack优化前端性能？
4. 如何提高webpack打包速度？
5. 如何提高webpack构建速度？
6. babel的原理
7. 常见git命令总结
   - git add . 暂存路径下所有修改文件
   - git commit -m commit_message
   - git fetch
   - git pull
   - git push
   - git checkout -b new_branch
   - git switch
   - git init
   - git merge
   - git rebase

      [git rebase的危险操作](http://jartto.wang/2018/12/11/git-rebase/)  
      git rebase合并分支的优点：相对merge减少了分支合并的记录，保持了分支整洁。  

      结论：只要你的分支上需要 rebase 的所有 commits 历史还没有被 push 过，就可以安全地使用 git-rebase来操作，从而避免了其他人pull远程代码时丢失提交记录的可能。
   - 删除分支 git branch -d branch_name
   - 查看所有本地分支及关联远程分支 git branch -vv
   - 查看所有本地及关联远程分支 git branch -a
   - 重命名分支 git branch -m new_branch
   - 设置关联远程分支 git branch --set-upstream-to=remote/branch
   - 新建并推送远程分支 git push -u origin branch_name
   - 比较两个文件的差异 git diff branch1..branch2  可选参数 --name-only仅列出差异的文件名
   - git stash
   - git stash apply stash@{id}
   - git log 可选参数 --oneline , --graph --all
   - 