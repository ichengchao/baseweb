package baseweb.utils;

import com.google.common.base.Optional;

import org.junit.Test;

public class DateFormatterTest {

    @Test
    public void test_test() {
        Optional<Integer> possible = Optional.of(5);
        System.out.println(possible.isPresent());
        System.out.println(possible.get());
    }

}
