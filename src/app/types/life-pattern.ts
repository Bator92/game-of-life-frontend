import {Block} from './block';
import { RuleSpecification} from './rule-specification';

export interface LifePattern {
  ruleSpecification: RuleSpecification;
  blocks: Block[];
}
