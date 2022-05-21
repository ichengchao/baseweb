package baseweb.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import baseweb.model.Demo;
import baseweb.model.Page;

@Component
public class DemoService {

    private static List<Demo> list = new ArrayList<Demo>();
    private static AtomicInteger maxId = new AtomicInteger(0);
    static {
        for (int i = 0; i < 55; i++) {
            Integer id = maxId.incrementAndGet();
            Demo demo = new Demo();
            demo.setId(id);
            demo.setName("name_" + id);
            demo.setComment(RandomStringUtils.randomAlphabetic(10));
            list.add(demo);
        }
    }

    public List<Demo> searchDemo(String simpleSearch, Page page) {
        List<Demo> result = new ArrayList<Demo>();
        for (Demo demo : list) {
            if (StringUtils.isBlank(simpleSearch) || demo.getName().contains(simpleSearch)) {
                result.add(demo);
            }
        }

        // 排序
        if (null != page) {
            if (StringUtils.isNotBlank(page.getSort())) {
                if ("name".equalsIgnoreCase(page.getSort())) {
                    Collections.sort(result, new Comparator<Demo>() {

                        @Override
                        public int compare(Demo o1, Demo o2) {
                            return o1.getName().compareTo(o2.getName());
                        }

                    });
                } else if ("comment".equalsIgnoreCase(page.getSort())) {
                    Collections.sort(result, new Comparator<Demo>() {

                        @Override
                        public int compare(Demo o1, Demo o2) {
                            return o1.getComment().compareTo(o2.getComment());
                        }

                    });
                } else if ("id".equalsIgnoreCase(page.getSort())) {
                    Collections.sort(result, new Comparator<Demo>() {

                        @Override
                        public int compare(Demo o1, Demo o2) {
                            return o1.getId().compareTo(o2.getId());
                        }

                    });
                }

            }
            if ("DESC".equalsIgnoreCase(page.getDir())) {
                Collections.reverse(result);
            }

            if (null != page.getStart() && null != page.getLimit()) {
                int toIndex = result.size() < (page.getStart() + page.getLimit()) ? result.size()
                        : (page.getStart() + page.getLimit());
                result = result.subList(page.getStart(), toIndex);
            }

            page.setTotal(list.size());
        }

        return result;
    }

    public void addDemo(Demo demo) {
        Assert.notNull(demo, "demo can not be null!");
        Assert.hasText(demo.getName(), "name can not be blank!");
        demo.setId(maxId.incrementAndGet());
        list.add(demo);
    }

    public void updateDemo(Demo demo) {
        for (Iterator<Demo> iterator = list.iterator(); iterator.hasNext();) {
            Demo demoInList = iterator.next();
            if (demoInList.getId().equals(demo.getId())) {
                demoInList.setName(demo.getName());
                demoInList.setComment(demo.getComment());
                break;
            }
        }
    }

    public void deleteDemo(Integer id) {
        Assert.notNull(id, "id can not be null!");
        for (Iterator<Demo> iterator = list.iterator(); iterator.hasNext();) {
            Demo demo = iterator.next();
            if (id.equals(demo.getId())) {
                iterator.remove();
                break;
            }
        }
    }

    public void batchDeleteDemo(List<Integer> idList) {
        Assert.notNull(idList, "idList can not be null!");
        for (Iterator<Demo> iterator = list.iterator(); iterator.hasNext();) {
            Demo demo = iterator.next();
            if (idList.contains(demo.getId())) {
                iterator.remove();
            }
        }
    }

}
