-- one tag
select SUM(sums.sum) 
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
and tags.title = "food" 

-- tags, expense
select SUM(sums.sum) 
from sums, tags, sum_tag_connection 
where sums.sum < 0
and sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
and (tags.title = "food" or tags.title = "monthly" )








SELECT sums.*, tags.*
FROM sums, tags, sum_tag_connection
WHERE sums.sum < 0
AND sum_tag_connection.sum_id = sums.id 
AND sum_tag_connection.tag_id = tags.id 
GROUP BY sums.id
HAVING (tags.title = "food" AND tags.title = "monthly")

SELECT SUM(sums.sum)
FROM sums, tags, sum_tag_connection
WHERE sums.sum < 0
AND sum_tag_connection.sum_id = sums.id 
AND sum_tag_connection.tag_id = tags.id 
AND tags.title IN ("food", "monthly")
GROUP BY sums.id

SELECT SUM(lista.sum)
FROM (
    SELECT sums.sum
    FROM sums, tags, sum_tag_connection
    WHERE sums.sum < 0
    AND sum_tag_connection.sum_id = sums.id 
    AND sum_tag_connection.tag_id = tags.id 
    AND tags.title IN ("food", "monthly")
    GROUP BY sums.id) as lista








-- all tags, no +/- separation
select tags.title, SUM(sums.sum) as sum_result
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
group by tags.id
order by sum_result desc

-- income
select tags.title, SUM(sums.sum) as income
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
and sums.sum > 0
group by tags.id

-- expense
select tags.title, SUM(sums.sum) as expense
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
and sums.sum < 0
group by tags.id

-- all
select tags.title, SUM(IF(sums.sum > 0, sums.sum, 0)) as income, SUM(IF(sums.sum < 0, sums.sum, 0)) as expense
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
group by tags.id
order by expense, income

-- all, date (7 month)
select tags.title, SUM(IF(sums.sum > 0, sums.sum, 0)) as income, SUM(IF(sums.sum < 0, sums.sum, 0)) as expense
from sums, tags, sum_tag_connection 
where sum_tag_connection.sum_id = sums.id 
and sum_tag_connection.tag_id = tags.id 
and sums.date >= "2016-01-01"
and sums.date < "2016-08-01"
group by tags.id
order by expense, income
-- monthly 	104580 	-508024
-- (-508024 / 7) / 22 = -3298,857143


-- all expense
select SUM(sums.sum) as expense
from sums
where sums.sum < 0
and sums.date >= "2016-01-01"
and sums.date < "2016-08-01"
order by expense
-- all -636740
-- (-636740 / 7) / 22 = -4134,675325