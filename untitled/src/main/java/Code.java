import java.util.*;

public class Code {

    private List<List<Integer>> solutions = new ArrayList<>();
    public int jump(int[] nums) {
        return compute(nums, 0, 0);
    }

    private int compute(int[] nums, int index, int jumps){
        if(nums.length-1 == index){
            return jumps;
        }

        if(index > nums.length-1)
            return 9999;

        int c = 9999;
        for(int x = nums[index]; x > 0; x--){
            if(x + index <= nums.length){
                c = Math.min(compute(nums, index+x, jumps+1), c);
            }
        }

        return c;
    }

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
            combination(candidates, target, new ArrayList<>(), 0);
            return solutions;
    }

    private void combination(int [] candidates, int target, List<Integer> combos, int sum) {
        if (sum == target) {
            Collections.sort(combos);
            if(!solutions.contains(combos)) {
                List<Integer> newList = new ArrayList<>(combos);
                solutions.add(newList);
            }
            return;
        }

        if(sum > target){
            return;
        }

        for(int x = 0; x < candidates.length; x++){
            if(candidates[x] + sum <= target){
                int index = combos.size();
                combos.add(candidates[x]);
                combination(candidates, target, combos, sum+candidates[x]);
                combos.remove(index);
            }
        }
    }
}
